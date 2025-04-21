export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
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
    // {
    //   name: "confirmPassword",
    //   label: "Confirm Password",
    //   placeholder: "Re-enter your password",
    //   componentType: "input",
    //   type: "password",
    // },
  ];
  
  export const loginFormControls = [
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

  export const forgotPasswordFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    }
  ];

  export const verifyOtpFormControls = [
    {
      name: "otp",
      label: "Otp",
      componentType: "input",
      type: "number",
      placeholder: "Enter opt here",
    },
  ];

  export const resetPasswordFormControls = [
    {
      name: "newPassword",
      label: "New Password",
      componentType: "input",
      type: "text",
      placeholder: "Enter your new password here...",
    },
    // {
    //   name: "confirmPassword",
    //   label: "Confirm Password",
    //   placeholder: "Re-enter your password",
    //   componentType: "input",
    //   type: "password",
    // },
  ];
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "men", label: "Men" },
        { id: "kids", label: "Kids" },
        { id: "women", label: "Women" },
      ],
    },
    {
      label: "Collection",
      name: "collection",
      componentType: "select",
      options: [
        { id: "shirts", label: "Shirts" },
        { id: "t-shirts", label: "T-Shirts" },
        { id: "trousers", label: "Trousers" },
        { id: "jeans", label: "Jeans" },
        { id: "cargos", label: "Cargos" },
        { id: "joggers", label: "Joggers" },
        { id: "oversized", label: "Oversized" },
        { id: "hoodies", label: "Hoodies" },
        { id: "sweatshirts", label: "Sweatshirts"},
        { id: "jackets", label: "Jackets" },
        { id: "shorts", label: "Shorts" },
        { id: "formal", label: "Formal Wear" },
        { id: "footwear", label: "Footwear"},
        { id: "accessories", label: "Accessories"},
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "men",
      label: "Men",
      path: "/shop/listing",
    },
    {
      id: "women",
      label: "Women",
      path: "/shop/listing",
    },
    {
      id: "kids",
      label: "Kids",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  
  export const categoryOptionsMap = {
    men: "Men",
    kids: "Kids",
    women: "Women",
  };
  
  export const collectionOptionsMap = {
    shirts: "Shirts",
    "t-shirts": "T-Shirts",
    trousers: "Trousers",
    jeans: "Jeans",
    cargos: "Cargos",
    joggers: "Joggers",
    oversized: "Oversized",
    hoodies: "Hoodies",
    sweatshirts: "Sweatshirts",
    jackets: "Jackets",
    shorts: "Shorts",
    formal: "Formal Wear",
    footwear: "Footwear",
    accessories: "Accessories",
  };
  
  export const filterOptions = {
    category: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
    ],
    collection: [
      { id: "shirts", label: "Shirts" },
      { id: "t-shirts", label: "T-Shirts" },
      { id: "trousers", label: "Trousers" },
      { id: "jeans", label: "Jeans" },
      { id: "cargos", label: "Cargos" },
      { id: "joggers", label: "Joggers" },
      { id: "oversized", label: "Oversized" },
      { id: "hoodies", label: "Hoodies" },
      { id: "sweatshirts", label: "Sweatshirts"},
      { id: "jackets", label: "Jackets" },
      { id: "shorts", label: "Shorts" },
      { id: "formal", label: "Formal Wear" },
      { id: "footwear", label: "Footwear"},
      { id: "accessories", label: "Accessories"},
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];