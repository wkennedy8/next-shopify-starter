import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// UPDATE DOMAIN AND TOKEN
const client = createStorefrontApiClient({
	storeDomain: 'cr04u1-53.myshopify.com',
	publicAccessToken: '0356d520305b35ff2a3c854a37618b2b',
	apiVersion: '2025-01'
});

export async function shopifyFetch(query, variables = {}) {
	return client.request(query, variables);
}

export async function getProducts() {
	const query = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

	const { data } = await shopifyFetch(query);

	return data.products.edges.map(({ node }) => ({
		id: Number(node.id.split('/').pop()), // Extract numeric ID
		title: node.title,
		handle: node.handle,
		description: node.description,
		image: node.images.edges.length > 0 ? node.images.edges[0].node.url : null, // Get first image if available
		price:
			node.variants.edges.length > 0
				? parseFloat(node.variants.edges[0].node.price.amount)
				: null // Convert price to float
	}));
}

export async function getProduct(id) {
	const query = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 3) {
        edges {
          node {
            id
            title
            price {
              amount
            }
          }
        }
      }
    }
  }
`;

	const variables = {
		id: `gid://shopify/Product/${id}`
	};

	const { data } = await shopifyFetch(query, { variables });

	if (!data.product) {
		throw new Error(`Product with ID ${id} not found.`);
	}

	return {
		id: Number(data.product.id.split('/').pop()), // Extract numeric ID
		title: data.product.title,
		description: data.product.description,
		images: data.product.images.edges.map(({ node }) => node.url), // Array of image URLs
		price:
			data.product.variants.edges.length > 0
				? parseFloat(data.product.variants.edges[0].node.price.amount)
				: null, // Convert price to float
		variantId: data.product.variants.edges[0].node.id
	};
}

export async function getOrCreateCart() {
	let cartId = localStorage.getItem('shopify_cart_id');

	if (!cartId) {
		const query = `
    mutation {
      cartCreate {
        cart {
          id
        }
      }
    }
  `;

		const { data } = await shopifyFetch(query);
		cartId = data.cartCreate.cart.id;
		localStorage.setItem('shopify_cart_id', cartId);
	}

	return cartId;
}

export async function getCart(cartId) {
	const query = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
        }
      }
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  title
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 3) {
                    edges {
                    node {
                      id
                      title
                      price {
                        amount
                      }
                    }
                  }
                }
                  description   
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

	const variables = { cartId };
	const { data, errors } = await shopifyFetch(query, { variables });

	return data.cart || null;
}

export async function addToCart(cartId, variantId, quantity = 1) {
	const query = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

	const variables = {
		cartId,
		lines: [{ merchandiseId: variantId, quantity }]
	};
	const { data, errors } = await shopifyFetch(query, { variables });

	return data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId, lineId, currentQuantity) {
	// If the quantity is greater than 1, decrease it
	if (currentQuantity > 1) {
		const query = `
      mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
          }
        }
      }
    `;

		const variables = {
			cartId,
			lines: [{ id: lineId, quantity: currentQuantity - 1 }]
		};
		const { data, errors } = await shopifyFetch(query, { variables });

		return data.cartLinesUpdate.cart;
	}

	const query = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            }
          }
        }
      }
    }
  }
`;

	const variables = {
		cartId,
		lineIds: [lineId]
	};
	const { data, errors } = await shopifyFetch(query, {
		variables
	});

	return data.cartLinesRemove.cart;
}
