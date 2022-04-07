import { v4 as uuid } from "uuid";

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  
  {
    _id: uuid(),
    title:"HRX Dry Fit Shorts Men",
    brand: "HRX by Hrithik Roshan",
    categoryName:"Shorts",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11641064/2020/9/9/ac522d33-1325-4e3e-ab68-1de4768a61b11599633085687-HRX-by-Hrithik-Roshan-Men-Medieval-Blue-Solid-Regular-Fit-Ra-1.jpg",
    price: 479,
    discount: "56",
    rating: 2.1,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"HRX Dry Fit Shots Men",
    brand: "HRX by Hrithik Roshan",
    categoryName:'Shorts',
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/15308910/2021/12/29/d79a2f0d-9399-422b-8b30-f54e04a803f81640773545372-HRX-by-Hrithik-Roshan-Men-Shorts-4031640773544698-1.jpg",
    price: 569,
    discount: "56",
    rating: 2.5,
    inStock: false,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Regular Fit Shorts",
    brand: "Artengo By Decathlon",
    categoryName:"Shorts",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/11/17/00a92a9e-ae1f-4fdd-9d90-00b47e21430e1605624331855-1.jpg",
    price: 379,
    discount: "20",
    rating: 4.2,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Solid Running Shorts",
    brand: "H&M",
    categoryName:"Shorts",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14926966/2021/7/26/d0af5676-875d-4e10-8980-64bedc79ac591627271924271Runningshorts1.jpg",
    price: 1479,
    discount: "156",
    rating: 5,
    inStock: false,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Jamming 2.0 Running Shoe",
    brand: "Puma",
    categoryName:"Shoes",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14824822/2021/8/23/4c997245-e8d5-4e56-8a91-9096693d80131629712617426-Puma-Men-Sports-Shoes-521629712616966-1.jpg",
    price: 4999,
    discount: "556",
    rating: 4.3,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Quest 3 Running Shoes",
    brand: "Nike",
    categoryName:"Shoes",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/12738468/2020/12/23/1a7a4330-d5ef-4c3d-883f-0c76fe8002fc1608712520232-Nike-Quest-3-Mens-Running-Shoe-9651608712518299-1.jpg",
    price: 5095,
    discount: "1056",
    rating: 4.4,
    inStock: false,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men TR-100 Training Shoe",
    brand: "HRX by Hrithik Roshan",
    categoryName:"Shoes",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11160268/2020/11/27/871932ee-ef0f-4a09-80f7-3dcce42a65071606474095931HRXbyHrithikRoshanMenGreyTR-100TrainingShoe6.jpg",
    price: 2479,
    discount: "356",
    rating: 5,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Solid Leather Berbys",
    brand: "Carlo Romano",
    categoryName:"Shoes",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2021/1/13/eb79ef36-66df-403d-a18a-80502153f7a11610515731977-1.jpg",
    price: 1739,
    discount: "00",
    rating: 5,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Running Rapid Dry Tank T-shirt",
    brand: "HRX by Hrithik Roshan",
    categoryName:"T-shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10565534/2020/2/4/ec6bbc00-7b34-4317-9b64-f779acbb756d1580805807220-HRX-by-Hrithik-Roshan-Men-Blue--Charcoal-Grey-Colourblocked--1.jpg",
    price: 489,
    discount: "96",
    rating: 4.5,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Printed Pure Cotton T-shirt",
    brand: "Moda Rapido",
    categoryName:"T-shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/12702792/2021/2/17/4cc48900-e450-42dc-ae7f-733c01bb4e2e1613562686869-Moda-Rapido-Men-Tshirts-2331613562684861-3.jpg",
    price: 479,
    discount: "56",
    rating: 5,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Slim Fit T-shirt",
    brand: "Wrogn Active",
    categoryName:"T-shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/15076116/2021/11/15/574a6702-4232-46d1-94b0-73d808699e9e1636957236678-WROGN-ACTIVE-Men-Tshirts-6861636957236277-2.jpg",
    price: 959,
    discount: "200",
    rating: 4.7,
    inStock: false,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"RCB Replica Jersey T-shirt",
    brand: "Puma",
    categoryName:"T-shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/13971578/2021/4/6/248ce33e-48e7-4151-a1a0-0df964c8222c1617705074553-Puma-Men-Tshirts-8221617705073367-1.jpg",
    price: 1079,
    discount: "356",
    rating: 4.5,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Blue Opaque FormalShirt",
    brand: "Nautica",
    categoryName:"Shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/15353398/2021/10/13/849f7196-c54a-4b5d-aeea-f06c35d2c4ba1634116600300-Nautica-Men-Shirts-7321634116599779-1.jpg",
    price: 2479,
    discount: "756",
    rating: 3.5,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Slim Fit Casual Shirt",
    brand: "Bene Kleed",
    categoryName:"Shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/7189947/2018/8/30/aeb3002c-0114-4a6f-9509-d36adae2234d1535614137725-Bene-Kleed-Men-Off-White--Blue-Slim-Fit-Printed-Casual-Shirt-3181535614137565-5.jpg",
    price: 671,
    discount: "56",
    rating: 4.5,
    inStock: true,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Slim Fit Casual Shirt",
    brand: "Highlander",
    categoryName:"Shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11889114/2020/5/29/a782e7c4-f858-452a-8464-8a1585f9f26a1590729684166HIGHLANDERMenWhiteGreenSlimFitPrintedCasualShirt1.jpg",
    price: 479,
    discount: "56",
    rating: 5,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Slim Fit Casual Shirt",
    brand: "Roadster",
    categoryName:"Shirt",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11326670/2020/10/30/53ccf1ca-0f61-4b93-8f8d-f76c5cc47eb41604045539176IndianTerrainMenNavyBluePrintedSweatshirtShirtsRoadsterMenSh1.jpg",
    price: 479,
    discount: "56",
    rating: 5,
    inStock: false,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Skinny Fit Jeans",
    brand: "Roadster",
    categoryName:"Trousers",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11274420/2020/7/28/05669b4c-9f00-4e0e-8a36-e6448bed48b51595932635110-Roadster-Men-Blue-Skinny-Fit-Mid-Rise-Clean-Look-Stretchable-1.jpg",
    price: "479",
    discount: "56",
    rating: 5,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Straight Stretchable Jeans",
    brand: "Tommy Hilfiger",
    categoryName:"Trousers",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/14188430/2021/8/28/080d514e-5c9a-41a3-ab97-4c4aebaaaf541630127146716TommyHilfigerMenNavyBlueRelaxedStraightFitStretchableJeans1.jpg",
    price: 449,
    discount: "56",
    rating: 5,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Skinny Fit Jeans",
    brand: "IVOC",
    categoryName:"Trousers",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11305354/2020/1/28/d7602311-fc85-4c3c-89af-e6961c334b611580191857367-IVOC-Mens-Jeans-5361580191854374-1.jpg",
    price: 479,
    discount: "56",
    rating: 5,
    inStock: true,
    fastDelivery: false,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Chinos",
    brand: "Roadster",
    categoryName:"Trousers",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/6817881/2018/11/19/82465971-50e8-4e36-b9f0-ee9fa20127f41542624379231-Roadster-Men-Trousers-5631542624379031-1.jpg",
    price: 779,
    discount: "56",
    rating: 3.7,
    inStock: false,
    fastDelivery: true,
    quantity:1
  },
  {
    _id: uuid(),
    title:"Men Slim Fit Trousers",
    brand: "Rare Rabbit",
    categoryName:"Trousers",
    image:
      "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/17379788/2022/3/3/adeb0621-9410-4d0f-816c-7934159c07651646327542678RARERABBITMenGreyTailoredSlimFitTrousers3.jpg",
    price: 2999,
    discount: "156",
    rating: 3.9,
    inStock: true,
    fastDelivery: true,
    quantity:1
  }
];
