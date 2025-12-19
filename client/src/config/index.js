export const registerFormControles = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginControls = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
  },
  {
    name: "password",
    type: "paassword",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
  },
];

export const addProductFormControls = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter product title",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter sale price(optional)",
    componentType: "input",
    type: "number",
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select category",
    componentType: "select",
    options: [
      { id: "electronics", label: "Electronics" },
      { id: "fashion", label: "Fashion" },
      { id: "kitchen", label: "Kitchen" },
      { id: "beauty", label: "Beauty" },
      { id: "sports", label: "Sports" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Select brand name",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "puma", label: "Puma" },
      { id: "h&m", label: "H&M" },
      { id: "zara", label: "Zara" },
      { id: "aashirvad", label: "Aashirvad" },
    ],
  },
  {
    name: "stock",
    label: "Stock",
    placeholder: "Enter available stock",
    componentType: "input",
    type: "number",
  },
];

export const shoppingMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "products", label: "Products", path: "/shop/list" },
  { id: "electronics", label: "Electronics", path: "/shop/list" },
  { id: "fashion", label: "Fashion", path: "/shop/list" },
  { id: "kitchen", label: "Kitchen", path: "/shop/list" },
  { id: "beauty", label: "Beauty", path: "/shop/list" },
  { id: "sports", label: "Sports", path: "/shop/list" },
  { id: "search", label: "Search", path: "/shop/search" },
];

export const filterOptions = {
  category: [
    { id: "electronics", label: "Electronics" },
    { id: "fashion", label: "Fashion" },
    { id: "kitchen", label: "Kitchen" },
    { id: "beauty", label: "Beauty" },
    { id: "sports", label: "Sports" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "puma", label: "Puma" },
    { id: "h&m", label: "H&M" },
    { id: "zara", label: "Zara" },
    { id: "aashirvad", label: "Aashirvad" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price:Low to High" },
  { id: "price-hightolow", label: "Price:High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    name: "address",
    label: "Address",
    placeholder: "House no, street, area",
    componentType: "input",
    type: "text",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    componentType: "input",
    type: "text",
  },
  {
    name: "pincode",
    label: "Pincode",
    placeholder: "Enter pincode",
    componentType: "input",
    type: "number",
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
    componentType: "input",
    type: "number",
  },
  {
    name: "notes",
    label: "Delivery Notes",
    placeholder: "Landmark, delivery instructions, etc.",
    componentType: "textarea",
  },
];
