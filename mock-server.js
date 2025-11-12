const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:8000', 'http://localhost:9000', 'https://docs.medusajs.com'],
  credentials: true
}));

app.use(express.json());

// Mock health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mock regions endpoint
app.get('/store/regions', (req, res) => {
  // Accept the publishable key header (but don't validate it for mock)
  const publishableKey = req.headers['x-publishable-api-key'];
  console.log('Regions request received with key:', publishableKey);

  res.json({
    regions: [
      {
        id: 'reg_01',
        name: 'United States',
        currency_code: 'usd',
        currency: {
          code: 'usd',
          symbol: '$',
          name: 'US Dollar'
        },
        countries: [
          {
            id: 'us',
            iso_2: 'us',
            iso_3: 'usa',
            name: 'United States',
            display_name: 'United States',
            region_id: 'reg_01'
          }
        ],
        payment_providers: [],
        fulfillment_providers: []
      },
      {
        id: 'reg_02',
        name: 'Europe',
        currency_code: 'eur',
        currency: {
          code: 'eur',
          symbol: '€',
          name: 'Euro'
        },
        countries: [
          {
            id: 'fr',
            iso_2: 'fr',
            iso_3: 'fra',
            name: 'France',
            display_name: 'France',
            region_id: 'reg_02'
          }
        ],
        payment_providers: [],
        fulfillment_providers: []
      }
    ]
  });
});

// Mock products endpoint
app.get('/store/products', (req, res) => {
  res.json({
    products: [
      {
        id: 'prod_01',
        title: 'Sample T-Shirt',
        subtitle: 'Classic comfort tee',
        description: 'A comfortable cotton t-shirt perfect for everyday wear',
        handle: 'sample-t-shirt',
        is_giftcard: false,
        status: 'published',
        thumbnail: 'https://via.placeholder.com/300',
        variants: [
          {
            id: 'var_01',
            title: 'Small',
            product_id: 'prod_01',
            prices: [
              {
                id: 'price_01',
                variant_id: 'var_01',
                amount: 2500,
                currency_code: 'usd'
              }
            ],
            inventory_quantity: 100
          }
        ],
        options: [],
        images: [
          {
            id: 'img_01',
            url: 'https://via.placeholder.com/600'
          }
        ],
        price: {
          amount: 2500,
          currency_code: 'usd'
        }
      },
      {
        id: 'prod_02',
        title: 'Premium Hoodie',
        subtitle: 'Warm and cozy',
        description: 'A warm hoodie for cool days',
        handle: 'premium-hoodie',
        is_giftcard: false,
        status: 'published',
        thumbnail: 'https://via.placeholder.com/300',
        variants: [
          {
            id: 'var_02',
            title: 'Medium',
            product_id: 'prod_02',
            prices: [
              {
                id: 'price_02',
                variant_id: 'var_02',
                amount: 4500,
                currency_code: 'usd'
              }
            ],
            inventory_quantity: 50
          }
        ],
        options: [],
        images: [
          {
            id: 'img_02',
            url: 'https://via.placeholder.com/600'
          }
        ],
        price: {
          amount: 4500,
          currency_code: 'usd'
        }
      }
    ],
    count: 2,
    limit: 100,
    offset: 0
  });
});

// Mock product collections
app.get('/store/collections', (req, res) => {
  res.json({
    collections: [
      {
        id: 'col_01',
        title: 'Summer Collection',
        handle: 'summer'
      },
      {
        id: 'col_02',
        title: 'Winter Collection',
        handle: 'winter'
      }
    ]
  });
});

// Start server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Mock Medusa backend running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  - GET /health');
  console.log('  - GET /store/regions');
  console.log('  - GET /store/products');
  console.log('  - GET /store/collections');
});