import dayjs from 'dayjs';
import products from './products';
import { Order } from '@Types';

const now = dayjs();

const orders: Order[] = [
    {
        id:213451,
        created_at: now.subtract(1,`hour`).toISOString(),
        status: `Manufacturing`,
        user_id: `1`,
        order_items : [
            {
                id: 1,
                order_id: 213451,
                size: `44`,
                quantity: 1,
                product_id: products[0].id,
                products:products[0]
            },
            {
                id: 1,
                order_id: 213451,
                size: `42`,
                quantity: 1,
                product_id: products[1].id,
                products:products[1]
            }
        ]
    },
    {
        id:213452,
        created_at: now.subtract(5,`hour`).toISOString(),
        status: `Delivering`,
        user_id: `2`,
        order_items : [
            {
                id: 2,
                order_id: 213452,
                size: `44`,
                quantity: 1,
                product_id: products[2].id,
                products:products[2]
            },
            {
                id: 2,
                order_id: 213452,
                size: `46`,
                quantity: 1,
                product_id: products[3].id,
                products:products[3]
            }
        ]
    }
]

export default orders;