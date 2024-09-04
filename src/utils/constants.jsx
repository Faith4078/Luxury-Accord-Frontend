import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'At LuxuryAccord, we forge harmony between opulence and comfort, curating spaces that epitomize refined elegance. Our mission is to transcend furniture, crafting seamless luxury that resonates with your lifestyle, creating a symphony of sophistication in every home',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'Empowering homes with timeless luxury, LuxuryAccord envisions a world where every space radiates bespoke sophistication. We strive to be the quintessence of exquisite living, inspiring elegance that transcends trends, setting new standards for refined comfort and style.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'Established with a passion for elegance and a commitment to excellence, LuxuryAccord has woven a legacy of unparalleled craftsmanship since its inception. With a rich history spanning [X years], our brand has consistently delivered exquisite furniture, blending tradition with innovation, and adorning homes with enduring sophistication.',
  },
];

export const products_url = 'https://course-api.com/react-store-products';

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
