const books = [
    {
        title: 'The Hobbit',
        author: 'J. R. R. Tolkien',
        genre: 'Fantasy',
        description: `The Hobbit is set within Tolkien's fictional universe and follows the quest of home-loving Bilbo Baggins.`,
        price: 11.92,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/A1E+USP9f8L.jpg'
    },
    {
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        genre: 'Self-help',
        description: `The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life.`,
        price: 10.50,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg'
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        genre: 'Fiction',
        description: `The Alchemist is the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.`,
        price: 7.89,
        inStock: false,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51McwnDOdWL.jpg'
    },
    {
        title: 'The Count of Monte Cristo',
        author: 'Alexandre Dumas',
        genre: 'Adventure',
        description: `A young sailor from Marseilles is poised to become captain of his own ship and marry his beloved. But jealous enemies provoke his arrest, condemning Edmond Dantes to lifelong imprisonment in the infamous Chateau d'If.`,
        price: '12.69',
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/41HNhXMV9tL._SX323_BO1,204,203,200_.jpg'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Tragedy',
        description: `The novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.`,
        price: 8.41,
        inStock: true,
        imgURL: 'https://www.candlesbook.com/wp-content/uploads/book-cover-art-print-the-great-gatsby.jpg'
    },
    {
        title: 'They Both Die at the End',
        author: 'Adam Silvera',
        genre: 'Adventure',
        description: `It is Silvera's third novel and focuses on two teenage boys, Mateo and Rufus, who discover that they only have one day left to live.`,
        price: 8.08,
        inStock: true,
        imgURL: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1525552784l/40043351._SY475_.jpg'
    },
    {
        title: 'Prisoner B-3087',
        author: 'Alan Gratz',
        genre: 'Biography',
        description: `Prisoner B-3087 is based on the true story of Yanek Gruener, a young Jewish boy who is 10 years old when the Nazis invade his home city of Kraków, Poland in September 1939.`,
        price: 14.38,
        inStock: true,
        imgURL: 'https://m.media-amazon.com/images/I/51SyfwWRBUL.jpg'
    },
    {
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        genre: 'Non-fiction',
        description: `Examines the psychological power of thought and the brain in the process of furthering your career for both monetary and personal satisfaction.`,
        price: 7.49,
        inStock: true,
        imgURL: 'https://images.penguinrandomhouse.com/cover/9781585424337'
    },
    {
        title: 'Den of Thieves',
        author: 'James B. Stewart',
        genre: 'True crime',
        description: `Den of Thieves recounts the insider trading scandals involving Ivan Boesky, Michael Milken, and other Wall Street financiers in the United States during the 1980s, such as Robert Freeman, Terren Peizer, Dennis Levine, Lowell Milken, John A.`,
        price: 12.99,
        inStock: false,
        imgURL: 'https://m.media-amazon.com/images/I/51seGMrs47L.jpg'
    },
    {
        title: 'Cracking the Coding Interview',
        author: 'Gayle Laakmann McDowell',
        genre: 'Textbook',
        description: `189 programming interview questions, ranging from the basics to the trickiest algorithm problems.`,
        price: 21.49,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/41p1cRZGtaL._SX348_BO1,204,203,200_.jpg'
    },
    {
        title: 'The Chef',
        author: 'James Patterson',
        genre: 'Mystery',
        description: `In the Carnival days leading up Mardi Gras, Detective Caleb Rooney comes under investigation for a murder he is accused of committing in the line of duty -- as a Major Crimes detective for the New Orleans Police Department.`,
        price: 7.48,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/41Bx8rDp-sL.jpg'
    },
    {
        title: `It's Not How Good You Are, It's How Good You Want To Be`,
        author: 'Paul Arden',
        genre: 'Self-help',
        description: `It's Not How Good You Are, It's How Good You Want to Be is a handbook of how to succeed in the world - a pocket 'bible' for the talented and timid to make the unthinkable thinkable and the impossible possible.`,
        price: 10.79,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51jMHwek-oL.jpg'
    },
    {
        title: 'Into the Abyss: An Extraordinary True Story',
        author: 'Carol Shaben',
        genre: 'Biography',
        description: `The book in fact is about long-term survival far beyond a cold night in the bush. There are the struggles of an overworked young pilot trying to build hours so he can get a real airline job.`,
        price: 16.19,
        inStock: true,
        imgURL: 'https://m.media-amazon.com/images/I/51+ET6nvFmL.jpg'
    },
    {
        title: 'Beginning Programming with Java For Dummies',
        author: 'Barry Burd',
        genre: 'Textbook',
        description: `Beginning Programming with Java For Dummies, 5th Edition is the easy-to-follow guide you'll want to keep in your back pocket as you work your way toward Java mastery!`,
        price: 20.21,
        inStock: true,
        imgURL: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/1192/9781119235538.jpg'
    },
    {
        title: 'The Power of Habit: Why We Do What We Do in Life and Business',
        author: 'Charles Duhigg',
        genre: 'Self-help',
        description: `In The Power of Habit, award-winning business reporter Charles Duhigg takes us to the thrilling edge of scientific discoveries that explain why habits exist and how they can be changed.`,
        price: 10.95,
        inStock: true,
        imgURL: 'https://media.shortform.com/covers/png/the-power-of-habit-cover.png'
    },
    {
        title: 'The Art of War',
        author: 'Sun Tzu',
        genre: 'Fiction',
        description: `Regarded as the world's oldest military treatise, this compact volume has instructed officers and tacticians for more than 2,000 years. More recently, it has taken on a new life as a guide to competing successfully in business, law, and sports.`,
        price: 8.45,
        inStock: true,
        imgURL: 'https://covers.openlibrary.org/b/id/7883930-L.jpg'
    },
    {
        title: 'The Umbrella Lady',
        author: 'V. C. Andrews',
        genre: 'Tragedy',
        description: `A young girl who has lost her father finds herself at the mercy of a mysterious woman who is not quite what she seems.`,
        price: 11.30,
        inStock: false,
        imgURL: 'https://m.media-amazon.com/images/I/51U3vlTzrbL.jpg'
    },
    {
        title: 'The Couple Next Door',
        author: 'Shari Lapena',
        genre: 'True crime',
        description: `A domestic suspense debut about a young couple and their apparently friendly neighbors—a twisty, rollercoaster ride of lies, betrayal, and the secrets between husbands and wives.`,
        price: 6.89,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51rHYTlZ8bL._SX333_BO1,204,203,200_.jpg'
    },
    {
        title: 'Good Vibes, Good Life',
        author: 'Vex King',
        genre: 'Non-fiction',
        description: `How can you learn to truly love yourself? How can you transform negative emotions into positive ones? Is it possible to find lasting happiness?`,
        price: 12.29,
        inStock: true,
        imgURL: 'https://media.hayhouse.com/media/catalog/product/cache/745d7176530fbff1db13685a40017fcc/9/7/9781788171823.jpg'
    },
    {
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens',
        genre: 'Historical Fiction',
        description: ` The novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris and his release to live in London with his daughter Lucie, whom he had never met.`,
        price: 6.19,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/51xC8BB4jrL.jpg'
    },
    {
        title: 'The Family',
        author: 'Naomi Krupitsky',
        genre: 'Historical Fiction',
        description: ` A captivating debut novel about the tangled fates of two best friends and daughters of the Italian mafia, and a coming-of-age story of twentieth-century Brooklyn itself.`,
        price: 21.49,
        inStock: true,
        imgURL: 'https://images.penguinrandomhouse.com/cover/9780525541998'
    },
    {
        title: 'The Whispering Dead',
        author: 'Darcy Coates',
        genre: 'Horror',
        description: `Tangled in a dangerous web, she has to find a way to free the spirit...even if it means offering her own life in return.`,
        price: 11.99,
        inStock: true,
        imgURL: 'https://images.booksense.com/images/217/239/9781728239217.jpg'
    },
    {
        title: 'The Gunslinger',
        author: 'Stephen King',
        genre: 'Dark Fantasy',
        description: `In his desolate world, which mirrors our own in frightening ways, Roland tracks The Man in Black, encounters an enticing woman named Alice, and begins a friendship with the boy from New York named Jake.`,
        price: 16.00,
        inStock: true,
        imgURL: 'https://images-na.ssl-images-amazon.com/images/I/4153HF0AQAL.jpg'
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        genre: 'Science Fiction',
        description: ` Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness.`,
        price: 9.99,
        inStock: true,
        imgURL: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414l/44767458.jpg'
    },
    {
        title: 'The Final Six',
        author: 'Alexandra Monir',
        genre: 'Science Fiction',
        description: ` THE FINAL SIX follows two teens who must compete against twenty-four others for one of the coveted spots on the Europa mission: Leonardo Danieli from Italy and Naomi Ardalan of the United States.`,
        price: 8.99,
        inStock: true,
        imgURL: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1509198386l/36491465._SY475_.jpg'
    },
];

module.exports = {books};