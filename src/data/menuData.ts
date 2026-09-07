export interface MenuItem {
  id: string;
  nameAz: string;
  nameEn: string;
  descriptionAz: string;
  descriptionEn: string;
  price: number; // in AZN (₼)
  category: string;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  tags?: ('vegan' | 'glutenfree' | 'sugarfree' | 'hot' | 'cold' | 'signature')[];
  options?: {
    milk?: boolean; // Can change milk
    size?: boolean; // Can scale size S/M/L
    sugar?: boolean; // Can adjust sugar level
  };
  allergens?: string[];
}

export interface Category {
  id: string;
  nameAz: string;
  nameEn: string;
  icon: string; // lucide icon identifier
}

export interface CafeInfo {
  name: string;
  taglineAz: string;
  taglineEn: string;
  addressAz: string;
  addressEn: string;
  phone: string;
  instagram: string;
  tiktok: string;
  workingHoursAz: string;
  workingHoursEn: string;
  wifiName: string;
  wifiPass: string;
}

export const cafeInfo: CafeInfo = {
  name: "Vanillia Kofe və Şirniyyat Evi",
  taglineAz: "Sevgiylə hazırlanan təbii dad və zərif anların ünvanı.",
  taglineEn: "The perfect harmony of love, natural ingredients, and refined handmade pastries in every bite.",
  addressAz: "Nəcməddin Savalanov 58, 1 nömrəli məktəblə üzbəüz",
  addressEn: "58 Nacmaddin Savalanov, opposite School No.1",
  phone: "050-465-85-25",
  instagram: "vanillia_imishli",
  tiktok: "vanillia_imisli",
  workingHoursAz: "Hər gün: 08:00 - 00:00",
  workingHoursEn: "Daily: 08:00 - 00:00",
  wifiName: "Vanillia 5G",
  wifiPass: "vanillia2025"
};

export const categories: Category[] = [
  { id: "all", nameAz: "Hamısı", nameEn: "All", icon: "Utensils" },
  { id: "coffee", nameAz: "Kofelər", nameEn: "Coffees", icon: "Coffee" },
  { id: "tea", nameAz: "Çaylar", nameEn: "Teas", icon: "GlassWater" },
  { id: "milkshake", nameAz: "Milkşeyklər", nameEn: "Milkshakes", icon: "Milk" },
  { id: "lemonade", nameAz: "Limonadlar", nameEn: "Lemonades", icon: "CupSoda" },
  { id: "cold_drink", nameAz: "Soyuq İçkilər", nameEn: "Cold Drinks", icon: "Milk" },
  { id: "milli_sweet", nameAz: "Şirniyyatlar", nameEn: "Traditional Sweets", icon: "Cookie" },
  { id: "dessert", nameAz: "Desertlər", nameEn: "Desserts", icon: "Cake" },
  { id: "cake", nameAz: "Tortlar", nameEn: "Cakes", icon: "CakeSlice" },
  { id: "ice_cream", nameAz: "Dondurmalar", nameEn: "Ice Cream", icon: "IceCream" },
  { id: "fast_food", nameAz: "Fast Food", nameEn: "Fast Food", icon: "Pizza" }
];

export const menuItems: MenuItem[] = [
  // --- COFFEES ---
  {
    id: "h1",
    nameAz: "Espresso",
    nameEn: "Espresso",
    descriptionAz: "Zəngin ətirli, dolğun və köpüklü klassik espresso.",
    descriptionEn: "Richly aromatic, full-bodied classic single espresso with perfect crema.",
    price: 3.00,
    category: "coffee",
    image: "https://aeropress.com/cdn/shop/articles/Espresso-cup-with-coffee-beans_33509211-52c9-4e4a-af95-3984ad1d8d36_600x.jpg?v=1759798851",
    tags: ["hot"],
  },
  {
    id: "h2",
    nameAz: "Lungo",
    nameEn: "Lungo",
    descriptionAz: "Espressoya nisbətən daha yumşaq və bol su ilə çəkilən aromatik kofe.",
    descriptionEn: "A milder, longer extraction of espresso with a vibrant and smooth finish.",
    price: 3.00,
    category: "coffee",
    image: "https://img.magnific.com/free-photo/cup-coffee-table-grey-background_1220-7312.jpg",
    tags: ["hot"],
  },
  {
    id: "h3",
    nameAz: "Americano",
    nameEn: "Americano",
    descriptionAz: "İkiqat espresso və isti suyun möhtəşəm balansı ilə klassik dad.",
    descriptionEn: "Perfectly balanced double-shot espresso topped with hot water.",
    price: 4.00,
    category: "coffee",
    image: "https://myeverydaytable.com/wp-content/uploads/americano-1024x576.png",
    tags: ["hot"],
  },
  {
    id: "h4",
    nameAz: "Kapuçino",
    nameEn: "Cappuccino",
    descriptionAz: "Espresso, buxarlanmış isti süd və məxmər kimi süd köpüyü.",
    descriptionEn: "Classic espresso combined with warm steamed milk and thick velvety microfoam.",
    price: 5.00,
    category: "coffee",
    image: "https://coffee.az/wp-content/uploads/2022/09/nathan-dumlao-XOhI_kW_TaM-unsplash-edited-780x470.jpg",
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h5",
    nameAz: "Latte",
    nameEn: "Latte",
    descriptionAz: "İpək kimi buxarlanmış zərif süd və zəngin espressonun sevilən harmoniyası.",
    descriptionEn: "Warm steamed milk poured gently over a single shot of fresh espresso.",
    price: 5.00,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600",
    isPopular: true,
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h6",
    nameAz: "Flat White",
    nameEn: "Flat White",
    descriptionAz: "İkiqat espressonun daha sıx və kremli isti südlə mükəmməl formulası.",
    descriptionEn: "Rich double shot of espresso combined with velvety, thin-foamed steamed milk.",
    price: 5.00,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=600",
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h7",
    nameAz: "Latte Makkiato",
    nameEn: "Latte Macchiato",
    descriptionAz: "İsti buxarlanmış süd və zərif köpük üzərinə yüngülcə süzülən espresso ləzzəti.",
    descriptionEn: "Velvety steamed milk marked with a luxurious shot of fresh espresso.",
    price: 5.00,
    category: "coffee",
    image: "https://podmkr.com/wp-content/uploads/2023/11/latte-macchiato-600x400.png",
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h8",
    nameAz: "Moka",
    nameEn: "Mocha",
    descriptionAz: "Espresso, Belçika şokoladı sousu, buxarlanmış isti süd və şokoladlı ləzzət.",
    descriptionEn: "Fusing premium espresso with rich chocolate sauce and freshly-steamed milk.",
    price: 5.00,
    category: "coffee",
    image: "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/the_perfect_mocha_coffee_29100_16x9.jpg",
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h9",
    nameAz: "Raf",
    nameEn: "Raf",
    descriptionAz: "Qaymaq, espresso və vanil şəkərinin birlikdə çalınması ilə alınan zərif kremli kofe.",
    descriptionEn: "Smooth steamed cream custom-blended together with espresso and sweet vanilla.",
    price: 7.00,
    category: "coffee",
    image: "https://www.cremashop.eu/content/www.crema.fi/media/recipe/raf-coffee/ingredients_7be4fbcfbcca29905a1ddc9288fe409a.jpeg",
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "c1",
    nameAz: "Buzlu Latte",
    nameEn: "Iced Latte",
    descriptionAz: "Soyuq süd, bol buz kubları və tər espresso ilə hazırlanmış təravətli kofe.",
    descriptionEn: "Bold espresso combined with chilled organic milk and ice cubes.",
    price: 5.00,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600",
    tags: ["cold"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "c2",
    nameAz: "Buzlu Americano",
    nameEn: "Iced Americano",
    descriptionAz: "Soyuq su, buz kubları və ikiqat espressonun soyuq möhtəşəmliyi.",
    descriptionEn: "Double shot of espresso brewed fresh and poured over cold water and ice.",
    price: 4.00,
    category: "coffee",
    image: "https://www.kahvegunlukleri.com/wp-content/uploads/2025/09/iced-americano-recipe-1024x6831-2-800x400.webp",
    tags: ["cold"],
  },
  {
    id: "c3",
    nameAz: "Aerokano (Aerocano)",
    nameEn: "Aerocano",
    descriptionAz: "Buzlu espresso və suyun buxar borusu ilə çalınaraq əldə edilən zərif köpüklü, ipək teksturalı fərqli soyuq kofe.",
    descriptionEn: "A cold coffee experience featuring espresso and water textured with a steam wand to create a velvety, microfoamed finish.",
    price: 4.00,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600",
    tags: ["cold"],
  },
  {
    id: "h10",
    nameAz: "Affoqato (Affogato)",
    nameEn: "Affogato",
    descriptionAz: "Bir top soyuq vanilli dondurma üzərinə süzülən qaynar tək espresso harmoniyası.",
    descriptionEn: "A scoop of cold vanilla ice cream drowned in a hot shot of fresh espresso.",
    price: 5.00,
    category: "coffee",
    image: "https://static01.nyt.com/images/2021/08/15/magazine/affogato/affogato-superJumbo-v2.jpg?format=pjpg&quality=75&auto=webp&disable=upscale",
    isNew: true,
    tags: ["hot", "cold"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h11",
    nameAz: "Cortado",
    nameEn: "Cortado",
    descriptionAz: "Bərabər nisbətdə espresso və buxarlanmış isti südün zərif, lakin sıx balansı.",
    descriptionEn: "A balanced coffee consisting of equal parts espresso and warm steamed milk.",
    price: 5.00,
    category: "coffee",
    image: "https://www.foodandwine.com/thmb/mlf4mS6C08bh5zYpQ_vftGzP32s=/750x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg",
    isNew: true,
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "h12",
    nameAz: "İspan Lattesi (Spanish Latte)",
    nameEn: "Spanish Latte",
    descriptionAz: "Espresso, buxarlanmış süd və şirin qatılaşdırılmış südün ləziz vəhdəti.",
    descriptionEn: "A sweet espresso-based drink made with steamed milk and sweetened condensed milk.",
    price: 5.00,
    category: "coffee",
    image: "https://fancifuleats.com/wp-content/uploads/2024/04/iced-spanish-latte-2.jpg",
    isNew: true,
    tags: ["hot"],
    allergens: ["Süd / Lactose"]
  },

  // --- MILKSHAKES ---
  {
    id: "ms1",
    nameAz: "Vanilli Milkşeyk",
    nameEn: "Vanilla Milkshake",
    descriptionAz: "Qaymaqlı vanilli dondurma, soyuq süd və təbii vanil ekstraktı ilə mikserdə çalınmış xüsusi kokteyl.",
    descriptionEn: "Classic velvety milkshake whipped with vanilla ice cream, rich chilled milk, and natural vanilla flavor.",
    price: 5.00,
    category: "milkshake",
    image: "https://cdn.mygingergarlickitchen.com/images_webp/800px/800px-vanilla-milkshake-recipe-2.webp",
    tags: ["cold"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "ms2",
    nameAz: "Kokoslu Milkşeyk",
    nameEn: "Coconut Milkshake",
    descriptionAz: "Tropik kokos dadı, kremli vanil dondurması və sərin südün ecazkar harmoniyası.",
    descriptionEn: "Exotic tropical coconut blended with creamy ice cream and chilled fresh milk.",
    price: 5.00,
    category: "milkshake",
    image: "https://recettes.vedrenne.fr/1217-large_default/coconut-milkshake.jpg",
    tags: ["cold"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "ms3",
    nameAz: "Kivili Milkşeyk",
    nameEn: "Kiwi Milkshake",
    descriptionAz: "Təzə kivi dadı, sərin süd və dondurmanın fərahlandırıcı və vitaminli sintezi.",
    descriptionEn: "Refreshing green kiwi flavor blended perfectly with rich ice cream and fresh milk.",
    price: 5.00,
    category: "milkshake",
    image: "https://garajpizzaburger.com/menu/resimler/800x800-1458913391136.jpg",
    tags: ["cold"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "ms4",
    nameAz: "Çiyələkli Milkşeyk",
    nameEn: "Strawberry Milkshake",
    descriptionAz: "Şirin çiyələk dadlı, kremli dondurma və təbii süd ilə hazırlanan unudulmaz klassik.",
    descriptionEn: "All-time favorite blend of sweet strawberry puree, rich vanilla ice cream, and cold milk.",
    price: 5.00,
    category: "milkshake",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    isPopular: true,
    tags: ["cold"],
    allergens: ["Süd / Lactose"]
  },

  // --- LEMONADES ---
  {
    id: "l1",
    nameAz: "Grenade Limonad",
    nameEn: "Pomegranate Lemonade",
    descriptionAz: "Təbii şirin nar ekstraktı, təzə sıxılmış limon şirəsi, buz və mineral su.",
    descriptionEn: "Sweet natural pomegranate extract, freshly squeezed lemon juice, sparkling water, and ice.",
    price: 5.00,
    category: "lemonade",
    image: "https://nordicboba.com/wp-content/uploads/2024/10/Pomegranate-recipe-image-min.png",
    tags: ["cold"]
  },
  {
    id: "l2",
    nameAz: "Mango Maracuja Lemonade",
    nameEn: "Mango Maracuja Lemonade",
    descriptionAz: "Tropik səmimiyyət: zərif manqo şərbəti, ekzotik marakuya (passionfruit) ətri və təzə laym.",
    descriptionEn: "A sun-kissed mix of sweet mango, exotic passionfruit nectar, fresh lime, and soda.",
    price: 5.00,
    category: "lemonade",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS722XbfR1Z-1dueYEAd578b17jy-BtRur-v-BlzjU3xMJIVeuL6EST1QI&s=10",
    isPopular: true,
    tags: ["cold"]
  },
  {
    id: "l3",
    nameAz: "Mango Ananas Limonad",
    nameEn: "Mango Pineapple Lemonade",
    descriptionAz: "Eksklüziv dad: tropik ananas suyunun şirin manqo və limonla sərinləşdirici qarışığı.",
    descriptionEn: "A magnificent blend of pure pineapple juice, sweet mango nectar, and sparkling soda.",
    price: 5.00,
    category: "lemonade",
    image: "https://www.homemadeinterest.com/wp-content/uploads/2021/05/Mango-Pineapple-Smoothie_IG-1.jpg",
    tags: ["cold"]
  },
  {
    id: "l4",
    nameAz: "Bubble Gum Limonad",
    nameEn: "Bubble Gum Lemonade",
    descriptionAz: "Uşaqlıq xatirələrini canlandıran şirin bubble gum ətirli və buzlu rəngarəng limonad.",
    descriptionEn: "Playful sweet bubble gum flavor mixed with zesty citrus lemonade and crushed ice.",
    price: 5.00,
    category: "lemonade",
    image: "https://monin.in/cdn/shop/files/Bubblegumlemonade.png?v=1686724234&width=1100",
    isNew: true,
    tags: ["cold"]
  },
  {
    id: "l5",
    nameAz: "Citrus Limonad",
    nameEn: "Citrus Lemonade",
    descriptionAz: "Təzə sıxılmış portağal, rəngli qreypfrut və limon şirəsinin canlandırıcı sintezi.",
    descriptionEn: "Deeply refreshing combination of freshly-squeezed orange, red grapefruit, and lemon juices.",
    price: 5.00,
    category: "lemonade",
    image: "https://cozycravings.com/wp-content/uploads/2022/04/DSC_3444-2.jpg",
    tags: ["cold"]
  },
  {
    id: "l6",
    nameAz: "Berry Limonad",
    nameEn: "Berry Lemonade",
    descriptionAz: "Meşə giləmeyvələri (çiyələk, moruq, qarağat), limon və nanə yarpaqları ilə unikal fərahlıq.",
    descriptionEn: "Wild hand-picked forest berries, squeezed lemon, mint sprigs, and chilled sparkling water.",
    price: 5.00,
    category: "lemonade",
    image: "https://meaningfuleats.com/wp-content/uploads/2014/07/berry-lemonade-recipe-1-768x768.jpg",
    tags: ["cold"]
  },
  {
    id: "l7",
    nameAz: "Mojito Limonad",
    nameEn: "Mojito Lemonade",
    descriptionAz: "Klassik təravət: bol təzə nanə yarpaqları, əzilmiş laym parçaları, şərbət və buz.",
    descriptionEn: "Ultra-crisp recipe including thoroughly muddled fresh mint leaves, lime slices, sugar syrup, and soda.",
    price: 5.00,
    category: "lemonade",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    tags: ["cold"]
  },

  // --- TEAS ---
  {
    id: "t1",
    nameAz: "Sadə Çay (Çaynik)",
    nameEn: "Plain Tea (Teapot)",
    descriptionAz: "Premium tünd qara yarpaq çayının ənənəvi şəkildə dəmlənmiş ətirli çaynik forması.",
    descriptionEn: "Rich, fragrant premium black tea leaves brewed traditionally, served in a tea set.",
    price: 3.00,
    category: "tea",
    image: "https://baraguz.com/cdn/shop/articles/what-is-the-best-black-tea-comprehensive-guide-196377.jpg?v=1727799527",
    tags: ["hot"]
  },
  {
    id: "t2",
    nameAz: "Fincan Çay",
    nameEn: "Cup of Tea",
    descriptionAz: "Fincanda isti təbii qara çay.",
    descriptionEn: "Quick and warm individual portion of freshly brewed aromatic black tea.",
    price: 0.50,
    category: "tea",
    image: "https://www.cumhuriyetpark.net/upload/urunler/fincan_cay_1.jpg",
    tags: ["hot"]
  },
  {
    id: "t3",
    nameAz: "Bitki Çayı (Çaynik)",
    nameEn: "Herbal Tea (Teapot)",
    descriptionAz: "Şəfalı dağ bitkiləri tərkibli gümrahlandırıcı çay.",
    descriptionEn: "Wild healing herbs: hand-picked thyme, field mint, and chamomile steeped in a warm teapot.",
    price: 5.00,
    category: "tea",
    image: "https://sia.az/storage/2018/01/06/strese-yi-gelen-bitki-aylar-nelerdir.jpg",
    tags: ["hot"]
  },

  // --- TRADITIONAL SWEETS (Milli Şirniyyatlar) ---
  {
    id: "m1",
    nameAz: "Badambura (1 ədəd)",
    nameEn: "Badambura (1 pc)",
    descriptionAz: "Lay-lay açılan zərif xəmir, badam və şəkər içliyi ilə hazırlanan milli desertimiz.",
    descriptionEn: "Traditional flaky layered pastry filled with finely ground almonds, sugar, and cardamom.",
    price: 1.50,
    category: "milli_sweet",
    image: "https://images.squarespace-cdn.com/content/v1/668251371f51c035f1a7d441/f71bdba2-9ba2-4957-b8f6-ca6310d856f0/Cuisine_of_Azerbaijan-_Badambura_Wikipedia.jpg",
    tags: ["signature"]
  },
  {
    id: "m2",
    nameAz: "Milli Paxlava (1 ədəd)",
    nameEn: "Traditional Baklava (1 pc)",
    descriptionAz: "Ballı-şərbətli, ətirli hil və qoz içliyi ilə bişən əsl milli paxlava dilimi.",
    descriptionEn: "Rich, multi-layered sweet pastry made with paper-thin dough, walnuts, cardamom, and pure honey.",
    price: 1.00,
    category: "milli_sweet",
    image: "https://quzu.az/wp-content/uploads/paxlavaaze.webp",
    isPopular: true
  },
  {
    id: "m3",
    nameAz: "Şəkərbura (Fındıqla, 1 ədəd)",
    nameEn: "Shekerbura (with Hazelnut, 1 pc)",
    descriptionAz: "Üzəri naxışlı, fındıq və hil qarışımlı dadı damaqda qalan şəkərbura.",
    descriptionEn: "Traditional decorated baked crescent pastry with toasted hazelnut, sugar, and spices fill.",
    price: 1.50,
    category: "milli_sweet",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/75/%C5%9E%C9%99k%C9%99rbura_Novruz_%C5%9Firniyyat%C4%B1.jpg",
  },
  {
    id: "m4",
    nameAz: "Qarabağ Kətəsi (1 kq)",
    nameEn: "Karabakh Keta (1 kg)",
    descriptionAz: "Şirin, unlu və kərə yağlı dolğusu ilə Qarabağ mətbəxinin məşhur kətəsi.",
    descriptionEn: "Soft traditional sweet bread filled with a rich buttery-flour sweet stuffing (inner chalva).",
    price: 10.00,
    category: "milli_sweet",
    image: "qarabagketesi.jpeg"
  },
  {
    id: "m5",
    nameAz: "Şəkərparə (1 kq)",
    nameEn: "Shekerpare (1 kg)",
    descriptionAz: "Şərbətə batırılmış, ağızda dağılan, üzəri fındıqlı şirin kurabiyə növü.",
    descriptionEn: "Traditional soft cookies soaked in sweet lemon-flavored syrup, topped with hazelnut.",
    price: 10.00,
    category: "milli_sweet",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbrYSaFsRShb0g6fSjmFP7WNMblOZ57PQMwj66UeHLw&s=10"
  },
  {
    id: "m6",
    nameAz: "Banan Şirniyyatı (Qozlu, 1 kq)",
    nameEn: "Banana Pastry (with Walnut, 1 kg)",
    descriptionAz: "İçliyi bol əzilmiş qoz və ətirli hil ilə zəngin banan formalı şirniyyat.",
    descriptionEn: "Delightful banana-shaped sweet pastries stuffed with a high-quality walnut sugar mix.",
    price: 10.00,
    category: "milli_sweet",
    image: "https://imageproxy.wolt.com/assets/699dbe563eb3341f036f5cd5"
  },
  {
    id: "m7",
    nameAz: "Donut (1 ədəd)",
    nameEn: "Donut (1 pc)",
    descriptionAz: "Şokolad qlazuru ilə örtülmüş, pambıq kimi yumşaq donut.",
    descriptionEn: "Soft and fluffy yeast-raised donut topped with rich Belgian chocolate glaze.",
    price: 1.00,
    category: "milli_sweet",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600",
    isNew: true
  },
  {
    id: "m8",
    nameAz: "Şokoladlı Kurabiyə (1 kq)",
    nameEn: "Chocolate Cookies (1 kg)",
    descriptionAz: "Bol şokolad damcıları ilə hazırlanmış xırtıldayan kərə yağlı kurabiyələr.",
    descriptionEn: "Freshly baked crunchy butter cookies loaded with rich premium chocolate chips.",
    price: 10.00,
    category: "milli_sweet",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "m9",
    nameAz: "Bermud Şirniyyatı (Qozlu, 1 kq)",
    nameEn: "Bermud Pastry (with Walnut, 1 kg)",
    descriptionAz: "Üçbucaqlı formada kəsilmiş, qozlu şirniyyat çeşidi.",
    descriptionEn: "Distinctive triangular sweet pastry with rich caramel and toasted walnut core.",
    price: 10.00,
    category: "milli_sweet",
    image: "https://imageproxy.wolt.com/menu/menu-images/6391eb355b986666fd8d6383/6f60c0b8-8105-11ed-84b9-220099b68e14_45.jpeg?w=1920"
  },

  // --- DESSERTS (Desertlər) ---
  {
    id: "d1",
    nameAz: "San Sebastian (1 dilim)",
    nameEn: "San Sebastian Cheesecake (1 slice)",
    descriptionAz: "Ağızda əriyən kremli içlik və qızarmış səth. (+Şokolad sousu istəyə görə +1 AZN).",
    descriptionEn: "Famous crustless burnt cheesecake with an ultra-creamy interior. (+Chocolate sauce option for +1 AZN).",
    price: 4.50,
    category: "dessert",
    image: "https://sugarpursuit.com/wp-content/uploads/2023/08/San-Sebastian-cheesecake.jpg",
    isPopular: true
  },
  {
    id: "d2",
    nameAz: "Tiramisu (1 dilim)",
    nameEn: "Tiramisu (1 slice)",
    descriptionAz: "Kofe şərbətinə batırılmış savoyardi biskvitləri və xüsusi maskarpone kremi ilə İtalyan üslublu keks.",
    descriptionEn: "Espresso-soaked ladyfingers layered with an airy and authentic mascarpone cream mousse.",
    price: 3.50,
    category: "dessert",
    image: "https://www.bunsenburnerbakery.com/wp-content/uploads/2025/03/easy-tiramisu-29.jpg"
  },
  {
    id: "d3",
    nameAz: "Cheesecake (1 dilim)",
    nameEn: "Classic Cheesecake (1 slice)",
    descriptionAz: "Zərif biskvit əsası və məxmər kimi qaymaqlı xama-pendir dolğulu klassik desert.",
    descriptionEn: "Creamy classic New York style cheesecake with a sweet crumbly graham crust.",
    price: 4.50,
    category: "dessert",
    image: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/63437ceaaca08392d64a4f54abcbe225/Derivates/d34ad6dd998b08781eb1b5cebdb014f3673fcf81.jpg"
  },
  {
    id: "d4",
    nameAz: "Ekler (1 ədəd)",
    nameEn: "Chocolate Eclair (1 pc)",
    descriptionAz: "Bişmiş xəmir, üstü parlaq qlazur şokolad və daxilində zərif südlü vanilli krem.",
    descriptionEn: "Light choux pastry filled with elegant dynamic custard cream, dipped in rich chocolate.",
    price: 1.00,
    category: "dessert",
    image: "https://evdar.az/wp-content/uploads/Zerif-Sitrus-Dadi-ile-Naringili-Ekler-Pirojnasi1-1170x650.jpg",
    allergens: ["Qlüten", "Yumurta"]
  },
  {
    id: "d5",
    nameAz: "Dilim Tort",
    nameEn: "Slice of Cake",
    descriptionAz: "Günün xüsusi seçimi olan gündəlik təzə bişmiş qaymaqlı dilim tort çeşidləri.",
    descriptionEn: "Daily selection of our fresh layered cream cakes baked directly in-house.",
    price: 2.00,
    category: "dessert",
    image: "https://imageproxy.wolt.com/assets/67b705b34553936f3bb364cd?w=960"
  },
  {
    id: "d6",
    nameAz: "Magnolia (1 ədəd)",
    nameEn: "Magnolia Dessert (1 pc)",
    descriptionAz: "Biskvit qırıntıları, zərif banan və ya çiyələk dilimləri ilə yüngül magnolia pudinqi.",
    descriptionEn: "Creamy vanilla pudding layered with sweet biscuit crumbs and fresh banana slices.",
    price: 3.50,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
    isNew: true
  },
  {
    id: "d7",
    nameAz: "Sufle (Soufflé)",
    nameEn: "Chocolate Soufflé",
    descriptionAz: "İsti sobadan çıxan, içi axıcı isti tünd Belçika şokoladlı möhtəşəm sufle.",
    descriptionEn: "Incredible warm liquid chocolate lava cake served hot with premium cocoa dusting.",
    price: 2.50,
    category: "dessert",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "d8",
    nameAz: "Spoonful (1 ədəd)",
    nameEn: "Spoonful Dessert (1 pc)",
    descriptionAz: "Yumşaq şokolad qatı, kremli pudinq və biskvitin daxilində zərif desert.",
    descriptionEn: "Luxurious creamy spoonful dessert with alternating layers of chocolate cream and genoise.",
    price: 2.50,
    category: "dessert",
    image: "https://aslibudur.com/wp-content/uploads/2026/01/Spoonful-Tatlisi.png",
    isNew: true
  },
  {
    id: "d9",
    nameAz: "Spartak (1 dilim)",
    nameEn: "Spartak Cake (1 slice)",
    descriptionAz: "Nazik şokoladlı-ballı xəmir qatları və südlü xüsusi bişmiş kremlə hazırlanan ləziz Spartak tortu.",
    descriptionEn: "Delicate layered chocolate-honey cake with rich vanilla custard cream filling.",
    price: 3.50,
    category: "dessert",
    image: "https://valentinascorner.com/wp-content/uploads/2019/11/Spartak-Cake-2.jpg",
    isNew: true
  },

  // --- CAKES ---
  {
    id: "tort1",
    nameAz: "Tort (Biskvit) 1 kq",
    nameEn: "Sponge Cake (1 kg)",
    descriptionAz: "Yumşaq biskvit qatları və zərif ev üslubu krem ilə klassik biskvit tortu.",
    descriptionEn: "Fluffy sponge cake layers filled with smooth and delicate sweet cream.",
    price: 13.00,
    category: "cake",
    image: "https://www.allrecipes.com/thmb/zb8muWE6CQ5XjclY_LQ2i-QwxN0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17981-one-bowl-chocolate-cake-iii-DDMFS-beauty-4x3-d2e182087e4b42a3a281a0a355ea60d1.jpg",
    isPopular: true
  },
  {
    id: "tort2",
    nameAz: "Tort (Yuxa) 1 kq",
    nameEn: "Traditional Layered Cake (1 kg)",
    descriptionAz: "İncə qat-qat bişmiş xəmir layları və dadı damaqda qalan zərif kərə yağlı bişmiş krem.",
    descriptionEn: "Traditional crispy layered cake with a delicious velvety custard cream.",
    price: 14.00,
    category: "cake",
    image: "/Gemini_Generated_Image_s4immxs4immxs4im.png"
  },
  {
    id: "tort3",
    nameAz: "Tort (Rafaello) 1 kq",
    nameEn: "Raffaello Cake (1 kg)",
    descriptionAz: "Kokos qırıntıları, ağ qaymaqlı krem, badam və bəyaz şokolad harmoniyası.",
    descriptionEn: "Dreamy coconut flakes, rich vanilla cream, almond notes, and premium white chocolate.",
    price: 13.00,
    category: "cake",
    image: "/Gemini_Generated_Image_33wvhy33wvhy33wv.png",
    isNew: true
  },

  // --- FAST FOOD ---
  {
    id: "f1",
    nameAz: "Mini Pizza (1 ədəd)",
    nameEn: "Mini Pizza (1 pc)",
    descriptionAz: "Uşaqların və böyüklərin sevimlisi: pomidor sousu, sosis və ərimiş mozzarella pendiri.",
    descriptionEn: "Perfectly baked personal mini pizza with zesty tomato sauce, sliced sausage, and melted cheese.",
    price: 1.00,
    category: "fast_food",
    image: "/minipizza.png"
  },
  {
    id: "f2",
    nameAz: "Hotdog (1 ədəd)",
    nameEn: "Classic Hot Dog (1 pc)",
    descriptionAz: "Yumşaq bulka və sosisin dadlı uyğunluğu.",
    descriptionEn: "Soft standard bun, toasted premium sausage, drizzled with sweet ketchup and light mayonnaise.",
    price: 0.70,
    category: "fast_food",
    image: "/hotdog.png"
  },
  {
    id: "f3",
    nameAz: "Dürüm Sadə (1 ədəd)",
    nameEn: "Plain Durum Wrap (1 pc)",
    descriptionAz: "İncə lavaşda xüsusi qızardılmış şirəli file tikələri və mayonez sousu ilə sadə dürüm.",
    descriptionEn: "Classic thin lavash flatbread wrap stuffed with juicy grilled chicken breast pieces.",
    price: 2.00,
    category: "fast_food",
    image: "/durumbalaca.png"
  },
  {
    id: "f4",
    nameAz: "Dürüm Xüsusi",
    nameEn: "Special Durum Wrap",
    descriptionAz: "Bol toyuq əti, kartof fri, turşu xiyar və xüsusi mastersous ilə ləziz xüsusi dürüm.",
    descriptionEn: "Gourmet wrap packed with extra chicken, french fries, pickles, and our master secret sauce.",
    price: 3.00,
    category: "fast_food",
    image: "/Durum.png",
    isPopular: true
  },
  {
    id: "f5",
    nameAz: "Kartof Fri",
    nameEn: "French Fries",
    descriptionAz: "Xırtıldayan qızılı rəngli kartof fri dilimləri.",
    descriptionEn: "Crispy salted golden french fries cooked to order, served with sweet tomato ketchup.",
    price: 2.50,
    category: "fast_food",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "f6",
    nameAz: "Sendviç (1 ədəd)",
    nameEn: "Toasted Sandwich (1 pc)",
    descriptionAz: "Tost çörəyi arasında kolbasa, təzə pomidor və süzmə dilim pendir.",
    descriptionEn: "Fresh toasted sandwich with tender ham, melted cheddar slice, crisp lettuce, and tomato.",
    price: 1.50,
    category: "fast_food",
    image: "/Sendvic.png",
    isNew: true
  },
  {
    id: "f7",
    nameAz: "Pepperoni Pizza",
    nameEn: "Pepperoni Pizza",
    descriptionAz: "Bol pepperoni kolbasası, xüsusi pomidor sousu və ərimiş mozzarella pendiri ilə hazırlanmış klassik pizza.",
    descriptionEn: "Classic pizza topped with premium pepperoni slices, special tomato sauce, and melted mozzarella cheese.",
    price: 10.00,
    category: "fast_food",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600",
    isPopular: true
  },
  {
    id: "f8",
    nameAz: "Miks Pizza",
    nameEn: "Mix Pizza",
    descriptionAz: "Kolbasa, göbələk, şirin bibər, zeytun, pomidor və ərimiş mozzarella pendiri ilə zəngin qarışıq pizza.",
    descriptionEn: "Richly topped pizza with sausage, mushrooms, bell peppers, olives, fresh tomatoes, and melted mozzarella cheese.",
    price: 10.00,
    category: "fast_food",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
    isPopular: true
  },
  {
    id: "f9",
    nameAz: "Marqarita Pizza",
    nameEn: "Margherita Pizza",
    descriptionAz: "Klassik İtalyan ləzzəti: xüsusi pomidor sousu, bol mozzarella pendiri və təzə reyhan.",
    descriptionEn: "Classic Italian taste: special tomato sauce, rich mozzarella cheese, and a delicate touch of fresh basil.",
    price: 9.00,
    category: "fast_food",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "f10",
    nameAz: "Şaurmalı Pizza",
    nameEn: "Shawarma Pizza",
    descriptionAz: "Xüsusi şaurma əti, turşu xiyar, özəl sous və ərimiş mozzarella pendiri ilə fərqli və ləziz pizza.",
    descriptionEn: "Unique and delicious pizza topped with tender shawarma meat, pickles, special sauce, and melted mozzarella cheese.",
    price: 10.00,
    category: "fast_food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
    isNew: true
  },
  {
    id: "f11",
    nameAz: "Şaurma",
    nameEn: "Shawarma",
    descriptionAz: "Xüsusi ədviyyatlı toyuq əti, turşu xiyar, kartof fri və özəl şaurma sousu ilə hazırlanmış klassik ləzzət.",
    descriptionEn: "Classic shawarma made with specially seasoned chicken, pickles, french fries, and signature shawarma sauce.",
    price: 3.50,
    category: "fast_food",
    image: "https://www.mecooks.com/wp-content/uploads/2025/10/IMGL1460-min-1536x1024.jpg",
    isPopular: true
  },
  {
    id: "f12",
    nameAz: "Toyuq Naqqetsləri (Nuggets)",
    nameEn: "Chicken Nuggets",
    descriptionAz: "Qızılı və xırtıldayan çörək qırıntılarında qızardılmış yumşaq toyuq file parçaları.",
    descriptionEn: "Tender chicken breast pieces fried to golden crispy perfection.",
    price: 3.00,
    category: "fast_food",
    image: "https://wp-cdn.typhur.com/wp-content/uploads/2025/02/air-fryer-frozen-chicken-nuggets.jpg",
    isNew: true
  },

  // --- COLD DRINKS (Soyuq İçkilər) ---
  {
    id: "sd1",
    nameAz: "Fanta 0.5 L",
    nameEn: "Fanta 0.5 L",
    descriptionAz: "Plastik butulkada sərinləşdirici portağallı qazlı içki Fanta.",
    descriptionEn: "Deeply refreshing orange soda served chilled in 0.5L plastic bottle.",
    price: 1.50,
    category: "cold_drink",
    image: "/Fanta05.png",
    tags: ["cold"]
  },
  {
    id: "sd2",
    nameAz: "Fanta 0.3 L",
    nameEn: "Fanta 0.3 L",
    descriptionAz: "Kiçik plastik butulkada portağallı soyuq qazlı içki.",
    descriptionEn: "Refreshing fanta orange flavored soda in 300 ml plastic bottle.",
    price: 1.00,
    category: "cold_drink",
    image: "https://backend.magnit.tj/uploads/images/f8ed850946fdb85e457e7c21d6b86b08-1024x1024.jpg",
    tags: ["cold"]
  },
  {
    id: "sd3",
    nameAz: "Fanta 1 L",
    nameEn: "Fanta 1 L",
    descriptionAz: "Ailəvi boy portağallı canlandırıcı və şirin Fanta soyuq içkisi.",
    descriptionEn: "Classic Fanta orange soda in a 1.0 liter bottle format.",
    price: 2.00,
    category: "cold_drink",
    image: "https://c7.alamy.com/comp/2G6227E/fanta-carbonated-drinks-orange-in-1-liter-plastic-bottles-istanbul-turkey-august-02-2020-isolated-on-a-white-background-2G6227E.jpg",
    tags: ["cold"]
  },
  {
    id: "sd4",
    nameAz: "Coca-Cola 0.5 L",
    nameEn: "Coca-Cola 0.5 L",
    descriptionAz: "Plastik butulkada sərinləşdirici orijinal Coca-Cola ləzzəti.",
    descriptionEn: "Original recipe sweet Coca-Cola served iced in 0.5L plastic bottle.",
    price: 1.50,
    category: "cold_drink",
    image: "/cola_0.5.png",
    tags: ["cold"],
    isPopular: true
  },
  {
    id: "sd5",
    nameAz: "Coca-Cola 0.3 L",
    nameEn: "Coca-Cola 0.3 L",
    descriptionAz: "Kiçik plastik butulkada orijinal dadlı soyuq Coca-Cola.",
    descriptionEn: "Classic original flavor Coca-Cola in 300 ml format.",
    price: 1.00,
    category: "cold_drink",
    image: "https://strgimgr.b-cdn.net/img/product/840/57bdc9ff-d6e4-4b78-a1f0-a3a3bf8000d9.jpeg?width=384&height=384&quality=90",
    tags: ["cold"]
  },
  {
    id: "sd6",
    nameAz: "Coca-Cola 1 L",
    nameEn: "Coca-Cola 1 L",
    descriptionAz: "Paylaşmaq üçün 1 litrlik böyük plastik butulkada Coca-Cola soyuq içki.",
    descriptionEn: "Family sized original flavor Coca-Cola bottle (1.0 liter).",
    price: 2.00,
    category: "cold_drink",
    image: "https://i5.walmartimages.com/seo/Coca-Cola-Soda-Pop-1-Liter-Bottle_0e05ba8c-ed84-48a9-9a45-2335ff570366.8c5774b98e497248ee20e82c5fc3e72a.jpeg?odnHeight=573&odnWidth=573&odnBg=FFFFFF",
    tags: ["cold"]
  },
  {
    id: "sd7",
    nameAz: "Sprite 0.5 L",
    nameEn: "Sprite 0.5 L",
    descriptionAz: "Limon və laym dadlı fərahladıcı soyuq qazlı içki Sprite plastik butulkada.",
    descriptionEn: "Crisp lemon-lime flavored sparkling soda in a handy 0.5L plastic bottle.",
    price: 1.50,
    category: "cold_drink",
    image: "https://burgerella.ch/wp-content/uploads/sites/87/2024/03/sprite-0.5l.jpg.webp",
    tags: ["cold"]
  },
  {
    id: "sd8",
    nameAz: "Sprite 0.3 L",
    nameEn: "Sprite 0.3 L",
    descriptionAz: "Kiçik zərif plastik butulkada limon keyfiyyətli soyuq Sprite.",
    descriptionEn: "Refreshing lemon and lime Sprite soda in 300 ml size.",
    price: 1.00,
    category: "cold_drink",
    image: "https://imageproxy.wolt.com/assets/688b9e9723fa16f725afc9d0?w=960",
    tags: ["cold"]
  },
  {
    id: "sd9",
    nameAz: "Sprite 1 L",
    nameEn: "Sprite 1 L",
    descriptionAz: "Böyük bir litrlik butulkada limon dadlı canlandırıcı soyuq Sprite.",
    descriptionEn: "Crisp dynamic lemon-lime bubble drink Sprite in 1.0L format.",
    price: 2.00,
    category: "cold_drink",
    image: "https://static.insales-cdn.com/r/afmYyRvxlN8/rs:fit:1140:1140:1/q:80/plain/images/products/1/3804/447573724/sprite-upakovka-6-sht-po-2-l-sladkaya-voda-pet.jpg@webp",
    tags: ["cold"]
  },
  {
    id: "sd10",
    nameAz: "Banka Coca-Cola",
    nameEn: "Canned Coca-Cola",
    descriptionAz: "Metal dəmir bankada sərin və bol qazlı orijinal daddı Coca-Cola.",
    descriptionEn: "Cold, freshly chilled original design metal can of Coca-Cola.",
    price: 2.00,
    category: "cold_drink",
    image: "https://strgimgr.b-cdn.net/sized/280/219397-04958729b95919c4ee1e29e9af654376.jpg?quality=80",
    tags: ["cold"],
    isNew: true
  },
  {
    id: "sd11",
    nameAz: "Banka Fanta",
    nameEn: "Canned Fanta",
    descriptionAz: "Metal buz dəmir bankada təqdim olunan canlı portağallı can fərahlığı.",
    descriptionEn: "Super chilled standard metal can of sweet orange flavored Fanta.",
    price: 2.00,
    category: "cold_drink",
    image: "https://imageproxy.wolt.com/assets/688b9bd9b2b18bf1da536f61",
    tags: ["cold"],
    isNew: true
  },
  {
    id: "sd12",
    nameAz: "Banka Sprite",
    nameEn: "Canned Sprite",
    descriptionAz: "Sərin dəmir bankada təzə limon ətirli Sprite sərinləşdiricisi.",
    descriptionEn: "Crisp and refreshing lemon-lime soda in a classic cold metal can.",
    price: 2.00,
    category: "cold_drink",
    image: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/185/401/447/581/513/28/100023688333b0.png",
    tags: ["cold"],
    isNew: true
  },
  {
    id: "sd13",
    nameAz: "Cappy 0.5 L",
    nameEn: "Cappy Juice 0.5 L",
    descriptionAz: "Təbii meyvə şirəsi zənginliyi ilə Cappy dadı müxtəlif çeşidlərdə.",
    descriptionEn: "Rich multi-fruit natural chilled Cappy juice in 0.5L plastic format.",
    price: 1.60,
    category: "cold_drink",
    image: "https://imageproxy.wolt.com/assets/688b9bd9b2b18bf1da536f6b?w=1920",
    tags: ["cold"]
  },
  {
    id: "sd14",
    nameAz: "Cappy 200 ml",
    nameEn: "Cappy Juice 200 ml",
    descriptionAz: "Kiçik mini qablaşdırmada ləziz təbii meyvə şirəsi çeşidləri.",
    descriptionEn: "Convenient single-sip portion of fresh blended Cappy fruit juice.",
    price: 1.00,
    category: "cold_drink",
    image: "https://static.ticimax.cloud/cdn-cgi/image/width=370,quality=85/35880/uploads/urunresimleri/buyuk/kategoriler-350-b3.jpeg",
    tags: ["cold"]
  },

  // --- ICE CREAMS (Dondurmalar) ---
  {
    id: "ic1",
    nameAz: "Sadə Dondurma (1 top)",
    nameEn: "Classic Ice Cream (1 scoop)",
    descriptionAz: "Təmiz qaymaqlı və təbii südlə hazırlanan zərif vanilli şirin dondurma.",
    descriptionEn: "Delicious classic creamy vanilla scoop prepared with clean organic milk.",
    price: 0.50,
    category: "ice_cream",
    image: "sade_marojna.png",
    tags: ["cold"],
    allergens: ["Süd / Lactose"]
  },
  {
    id: "ic2",
    nameAz: "Premium Dondurma (1 top)",
    nameEn: "Premium Gelato (1 scoop)",
    descriptionAz: "Xüsusi Belçika şokoladlı, fıstıqlı və ya karamelli ləziz dondurma çeşidi.",
    descriptionEn: "Rich gourmet scoop featuring premium Belgian chocolate, pistachio, or salted caramel.",
    price: 1.00,
    category: "ice_cream",
    image: "/premium_marojna.png",
    tags: ["cold"],
    isPopular: true,
    allergens: ["Süd / Lactose"]
  }
];