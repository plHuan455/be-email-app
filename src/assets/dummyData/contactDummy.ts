import { ContactResponse } from "@api/contact/interface";

export const contactDummy: ContactResponse[] = [
  {
    id: 1,
    email: 'nguyenvanteo1@gmail.com',
    first_name: 'Teo',
    last_name: 'Nguyen',
    avatar: 'https://i.picsum.photos/id/665/300/300.jpg?hmac=xYiL9urY_w9TPtq_btSUB4u2i3MFu8QYe0fagNuHdGw',
    phone: '12321389123213',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    email: 'nguyenvanteo2@gmail.com',
    first_name: 'Teo 2',
    last_name: 'Nguyen',
    avatar: 'https://i.picsum.photos/id/630/300/300.jpg?hmac=30ld9V3IDxhZbZ4T3oR-sR7R1Stg_2CSGkt04-Pe8yE',
    phone: '12321389123213',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    email: 'nguyenvanteo3@gmail.com',
    first_name: 'Teo3',
    last_name: 'Nguyen',
    avatar: 'https://i.picsum.photos/id/378/300/300.jpg?hmac=A3evDiBf9EeTXzFaMPxS8bfPY75G6uJjbtk7pyV54Go',
    phone: '12321389123213',
    created_at: new Date().toISOString()
  },
]