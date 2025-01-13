const products = [
  { id: 1, name: "Product 1", price: "$10.00", image: "path/to/image1.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 2, name: "Knife Board", price: "$15.00", image: "path/to/image2.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 3, name: "Product 3", price: "$20.00", image: "path/to/image3.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 4, name: "Product 4", price: "$25.00", image: "path/to/image4.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 5, name: "Product 5", price: "$30.00", image: "path/to/image5.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 6, name: "Product 6", price: "$35.00", image: "path/to/image6.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 7, name: "Product 7", price: "$40.00", image: "path/to/image7.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 8, name: "Product 8", price: "$45.00", image: "path/to/image8.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 9, name: "Captain Jacks", price: "$110.00", image: "public/assets/productimages/captainJack.HEIC", category: "instant winners", tags: ["instant", "winner"] },
  { id: 10, name: "Product 10", price: "$55.00", image: "path/to/image10.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 11, name: "Product 11", price: "$60.00", image: "path/to/image11.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 12, name: "Product 12", price: "$65.00", image: "path/to/image12.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 13, name: "Product 13", price: "$70.00", image: "path/to/image13.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 14, name: "BigFoots", price: "$75.00", image: "public/assets/productimages/bigfoot.heic", category: "instant winners", tags: ["instant", "winner"] },
  { id: 15, name: "Product 15", price: "$80.00", image: "path/to/image15.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 16, name: "Product 16", price: "$85.00", image: "path/to/image16.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 17, name: "Product 17", price: "$90.00", image: "path/to/image17.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 18, name: "Product 18", price: "$95.00", image: "path/to/image18.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 19, name: "Product 19", price: "$100.00", image: "path/to/image19.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 20, name: "Product 20", price: "$105.00", image: "path/to/image20.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 21, name: "Product 21", price: "$110.00", image: "path/to/image21.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 22, name: "Product 22", price: "$115.00", image: "path/to/image22.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 23, name: "Product 23", price: "$120.00", image: "path/to/image23.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 24, name: "Product 24", price: "$125.00", image: "path/to/image24.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 25, name: "Product 25", price: "$130.00", image: "path/to/image25.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 26, name: "Product 26", price: "$135.00", image: "path/to/image26.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 27, name: "Product 27", price: "$140.00", image: "path/to/image27.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 28, name: "Product 28", price: "$145.00", image: "path/to/image28.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 29, name: "Product 29", price: "$150.00", image: "path/to/image29.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 30, name: "Product 30", price: "$155.00", image: "path/to/image30.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 31, name: "Product 31", price: "$160.00", image: "path/to/image31.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 32, name: "Product 32", price: "$165.00", image: "path/to/image32.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 33, name: "Product 33", price: "$170.00", image: "path/to/image33.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 34, name: "Product 34", price: "$175.00", image: "path/to/image34.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 35, name: "Product 35", price: "$180.00", image: "path/to/image35.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 36, name: "Product 36", price: "$185.00", image: "path/to/image36.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 37, name: "Product 37", price: "$190.00", image: "path/to/image37.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 38, name: "Product 38", price: "$195.00", image: "path/to/image38.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 39, name: "Product 39", price: "$200.00", image: "path/to/image39.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 40, name: "Product 40", price: "$205.00", image: "path/to/image40.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 41, name: "Product 41", price: "$210.00", image: "path/to/image41.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 42, name: "Product 42", price: "$215.00", image: "path/to/image42.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 43, name: "Product 43", price: "$220.00", image: "path/to/image43.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 44, name: "Product 44", price: "$225.00", image: "path/to/image44.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 45, name: "Product 45", price: "$230.00", image: "path/to/image45.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 46, name: "Product 46", price: "$235.00", image: "path/to/image46.jpg", category: "tip boards", tags: ["tip", "board"] },
  { id: 47, name: "Product 47", price: "$240.00", image: "path/to/image47.jpg", category: "coin boards", tags: ["coin", "board"] },
  { id: 48, name: "Product 48", price: "$245.00", image: "path/to/image48.jpg", category: "tip jars", tags: ["tip", "jar"] },
  { id: 49, name: "Product 49", price: "$250.00", image: "path/to/image49.jpg", category: "instant winners", tags: ["instant", "winner"] },
  { id: 50, name: "Product 50", price: "$255.00", image: "path/to/image50.jpg", category: "bingo dobbers", tags: ["bingo", "dobber"] },
  { id: 51, name: "Product 51", price: "$260.00", image: "path/to/image51.jpg", category: "bonus boards", tags: ["bonus", "board"] }, // New product
  { id: 52, name: "Product 52", price: "$265.00", image: "path/to/image52.jpg", category: "bonus boards", tags: ["bonus", "board"] }, // New product
  { id: 53, name: "Product 53", price: "$270.00", image: "path/to/image53.jpg", category: "bingo games", tags: ["bingo", "game"] }, // New product
  { id: 54, name: "Product 54", price: "$275.00", image: "path/to/image54.jpg", category: "bingo games", tags: ["bingo", "game"] }, // New product
  { id: 55, name: "Product 55", price: "$280.00", image: "path/to/image55.jpg", category: "scratch off boards", tags: ["scratch", "off", "board"] }, // New product
  { id: 56, name: "Product 56", price: "$285.00", image: "path/to/image56.jpg", category: "scratch off boards", tags: ["scratch", "off", "board"] }, // New product
  { id: 57, name: "287 Bee Ball", price: "$290.00", image: "path/to/image57.jpg", category: "bingo card games", tags: ["bingo", "card", "game"] }, // New product
  { id: 58, name: "287 Big Rig", price: "$295.00", image: "path/to/image58.jpg", category: "bingo card games", tags: ["bingo", "card", "game"] }, // New product}
  { id: 59, name: "Product 59", price: "$300.00", image: "path/to/image59.jpg", category: "raffle tickets", tags: ["raffle", "ticket"] }, // New product
  { id: 60, name: "Product 60", price: "$305.00", image: "path/to/image60.jpg", category: "raffle tickets", tags: ["raffle", "ticket"] }, // New product
  { id: 61, name: "Product 59", price: "$300.00", image: "path/to/image59.jpg", category: "raffle tickets", tags: ["raffle", "ticket"] }, // New product
  { id: 62, name: "Product 60", price: "$305.00", image: "path/to/image60.jpg", category: "raffle tickets", tags: ["raffle", "ticket"] } // New product
];

export default products;