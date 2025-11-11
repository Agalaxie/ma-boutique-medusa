// API Backend Medusa pour Vercel
// Contourne le bug du CLI Medusa

export default function handler(req, res) {
  const { method, url, query, body } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS
  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Mock API endpoints
  if (url === '/api/health' || url === '/health') {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'medusa-backend'
    });
  }

  if (url.startsWith('/store/regions')) {
    return res.status(200).json({
      regions: [
        {
          id: 'reg_01',
          name: 'United States',
          currency_code: 'usd',
          currency: {
            code: 'usd',
            symbol: '$',
            symbol_native: '$',
            name: 'US Dollar'
          },
          countries: [
            {
              id: 'us',
              iso_2: 'us',
              iso_3: 'usa',
              num_code: 840,
              name: 'United States',
              display_name: 'United States'
            }
          ],
          tax_rate: 0,
          payment_providers: ['stripe'],
          fulfillment_providers: ['manual']
        },
        {
          id: 'reg_02',
          name: 'Europe',
          currency_code: 'eur',
          currency: {
            code: 'eur',
            symbol: '€',
            symbol_native: '€',
            name: 'Euro'
          },
          countries: [
            {
              id: 'fr',
              iso_2: 'fr',
              iso_3: 'fra',
              num_code: 250,
              name: 'France',
              display_name: 'France'
            }
          ],
          tax_rate: 20,
          payment_providers: ['stripe'],
          fulfillment_providers: ['manual']
        }
      ]
    });
  }

  if (url.startsWith('/store/products')) {
    return res.status(200).json({
      products: [
        {
          id: 'prod_01',
          title: 'Sample T-Shirt',
          subtitle: 'Comfortable cotton t-shirt',
          description: 'High quality cotton t-shirt, perfect for everyday wear',
          handle: 'sample-t-shirt',
          is_giftcard: false,
          status: 'published',
          thumbnail: 'https://via.placeholder.com/300',
          variants: [
            {
              id: 'variant_01',
              title: 'Small',
              product_id: 'prod_01',
              prices: [
                {
                  id: 'price_01',
                  currency_code: 'usd',
                  amount: 1999,
                  min_quantity: 1,
                  max_quantity: 100
                }
              ],
              options: [
                {
                  id: 'opt_01',
                  value: 'S',
                  option_id: 'size'
                }
              ],
              inventory_quantity: 100
            },
            {
              id: 'variant_02',
              title: 'Medium',
              product_id: 'prod_01',
              prices: [
                {
                  id: 'price_02',
                  currency_code: 'usd',
                  amount: 1999,
                  min_quantity: 1,
                  max_quantity: 100
                }
              ],
              options: [
                {
                  id: 'opt_02',
                  value: 'M',
                  option_id: 'size'
                }
              ],
              inventory_quantity: 100
            }
          ],
          options: [
            {
              id: 'size',
              title: 'Size',
              product_id: 'prod_01',
              values: ['S', 'M', 'L', 'XL']
            }
          ],
          images: [
            {
              id: 'img_01',
              url: 'https://via.placeholder.com/600',
              alt: 'T-Shirt Front'
            }
          ],
          collection_id: null,
          type_id: null,
          tags: []
        },
        {
          id: 'prod_02',
          title: 'Classic Hoodie',
          subtitle: 'Warm and cozy hoodie',
          description: 'Premium quality hoodie for cold days',
          handle: 'classic-hoodie',
          is_giftcard: false,
          status: 'published',
          thumbnail: 'https://via.placeholder.com/300',
          variants: [
            {
              id: 'variant_03',
              title: 'Medium',
              product_id: 'prod_02',
              prices: [
                {
                  id: 'price_03',
                  currency_code: 'usd',
                  amount: 3999,
                  min_quantity: 1,
                  max_quantity: 100
                }
              ],
              options: [
                {
                  id: 'opt_03',
                  value: 'M',
                  option_id: 'size_hoodie'
                }
              ],
              inventory_quantity: 50
            }
          ],
          options: [
            {
              id: 'size_hoodie',
              title: 'Size',
              product_id: 'prod_02',
              values: ['S', 'M', 'L', 'XL']
            }
          ],
          images: [
            {
              id: 'img_02',
              url: 'https://via.placeholder.com/600',
              alt: 'Hoodie Front'
            }
          ],
          collection_id: null,
          type_id: null,
          tags: []
        }
      ],
      count: 2,
      limit: 10,
      offset: 0
    });
  }

  if (url.startsWith('/store/carts')) {
    return res.status(200).json({
      cart: {
        id: 'cart_01',
        email: null,
        billing_address_id: null,
        shipping_address_id: null,
        items: [],
        region_id: 'reg_01',
        discounts: [],
        gift_cards: [],
        customer_id: null,
        payment_sessions: [],
        payment_method: null,
        shipping_methods: [],
        type: 'default',
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        metadata: null,
        subtotal: 0,
        tax_total: 0,
        shipping_total: 0,
        discount_total: 0,
        gift_card_total: 0,
        total: 0
      }
    });
  }

  // Default 404
  return res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${url} not implemented yet`
  });
}