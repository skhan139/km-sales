import React, { useState } from 'react';
import './Blog.css'; // Import the CSS file for styling

const blogs = [
  {
    id: 1,
    title: 'How to Run a Successful Bingo Night',
    description: 'Learn tips and tricks for hosting a fun and engaging bingo night.',
    content: 'Running a successful bingo night starts with solid planning. Choose a suitable venue that can accommodate your expected number of players, has good lighting, and is accessible for all ages. Decide on a theme if you\'d like to spice things up—holiday themes, retro nights, or charity fundraisers add a fun twist. Be sure to promote your event well in advance using flyers, social media, and word of mouth to build excitement and secure a strong turnout.\n\nNext, organize your materials. You’ll need bingo cards, markers (daubers), a caller set (or digital number generator), and a clear system for tracking wins. Prizes are key to keeping the energy up, so offer a range of items—from small tokens to a grand prize—to maintain interest throughout the night. A good bingo caller brings charisma and clarity, so choose someone confident and engaging to keep the game moving and players entertained.\n\nFinally, focus on atmosphere and community. Keep the event upbeat with music, snacks, and short intermissions. Encourage friendly competition and provide clear rules at the beginning to avoid confusion. Whether you\'re raising funds, bringing a community together, or just having fun, a well-run bingo night can leave people asking when the next one is. Success lies in the details—and in making sure everyone leaves with a smile.',
  },
  
  {
    id: 2,
    title: 'Ordering Games For Bashes',
    description: 'Discover the origins and evolution of pull tabs in gaming.',
    content: `Planning a successful bash or event often hinges on having the right games to keep guests engaged and entertained. Pull tabs, with their quick reveal and chance-based thrills, have become a staple for such occasions. Whether you're hosting a fundraiser, a community carnival, or a private party, choosing the right selection of pull tab games can make a big difference in the energy and participation of your event.
  
  When ordering pull tab games, it's essential to consider the audience. Family-friendly bashes might favor colorful instant winners, while adults may enjoy games with higher payout possibilities or added suspense like bonus boards or tip jars. A mix of ticket styles and prize types can appeal to a wider crowd, increasing excitement and potentially boosting revenue or fundraising goals. Reliable suppliers usually offer themed packs and variety assortments tailored to events of different sizes.
  
  Advance planning is key. Order your games early to allow time for delivery and setup, and be sure to check your local gaming regulations to ensure compliance. Keep backups on hand in case one game becomes a hit or runs out early. With the right mix of fun, legality, and logistics, your pull tab setup can transform an ordinary bash into a memorable and profitable experience for everyone involved.`
  },
  
  {
    id: 3,
    title: 'Optimizng Your Orders For Your Crowds',
    description: 'A list of essential bingo supplies for your club.',
    content: `Running a smooth and engaging bingo night starts with having the right supplies tailored to your crowd. Whether you're managing a small weekly club or a large community event, optimizing your bingo orders ensures a better experience for players and reduces stress for organizers. Start with the essentials: bingo cards or paper sheets, daubers or markers, and a reliable bingo ball set or digital number caller.
  
  Beyond the basics, consider the crowd you're serving. For an older audience, large-print cards and clear audio calling can improve accessibility. If you’re expecting a younger, more energetic crowd, themed cards or novelty daubers can add excitement. Prizes should also match the crowd—think useful household items, gift cards, or even cash payouts depending on the formality and rules of your game. Offering a mix of prize tiers can keep participation levels high throughout the event.
  
  Bulk ordering from a trusted supplier not only saves money but also ensures consistency in quality. It's also wise to keep extras on hand for walk-ins or game expansions. By matching your supplies to your crowd's expectations, you'll create a more memorable, enjoyable atmosphere that encourages repeat attendance and word-of-mouth promotion.`
  },
  
  {
    id: 4,
    title: 'Splt Payouts Vs Straight Seals. Which Are Better?',
    description: 'Learn tips and tricks for hosting a fun and engaging bingo night.',
    content: `When choosing between split payouts and straight seals for your games, it's important to understand how each impacts player experience and profitability. Straight seals offer a clear, singular winner, which creates excitement and suspense as players wait to see who takes the top prize. They're simple to run and work especially well in smaller crowds where drawing out multiple winners might dilute the energy.
  
  On the other hand, split payouts divide the prize pool among multiple winners, which can make the game feel more inclusive. Players appreciate the increased odds of walking away with something, even if it’s a smaller share. This format works well for larger events or more frequent games, where keeping players engaged and coming back is a top priority. It can also reduce disappointment and foster a more communal atmosphere.
  
  Ultimately, the “better” choice depends on your event goals and audience preferences. If you're hosting a high-stakes night and want to build drama around a big win, go with straight seals. If you’re running a regular event and want more people to enjoy a piece of the pie, opt for split payouts. In many cases, alternating the formats throughout the night strikes the perfect balance between excitement and inclusivity.`
  },
  
  {
    id: 5,
    title: 'Instant Winner Games Vs Seal Card Games',
    description: 'Learn tips and tricks for hosting a fun and engaging bingo night.',
    content: `Choosing between instant winner games and seal card games can shape the pace and excitement level of your event. Instant winner games offer immediate gratification—players know right away if they've won, making these games fast-paced and ideal for keeping energy high. They're perfect for walk-up sales, casual players, and quick turnover, especially in environments like bars, clubs, or fast-moving bashes.
  
  Seal card games, by contrast, build anticipation. Players hold onto their tickets until all are sold, and then a seal is opened to reveal the winner. This adds drama and suspense, often drawing a crowd during the reveal moment. They're great for fundraising and bigger gatherings where you want to create a sense of occasion and maximize audience participation at once.
  
  Both game types have their strengths, and a balanced event often includes a mix. Use instant winners to generate quick action and fill downtime, while leveraging seal cards to anchor your event's peak moments. Understanding the rhythm of your crowd will help you decide when each game fits best into your event lineup.`
  },
  
  {
    id: 6,
    title: 'Planning Your Event With AI. How To Use AI To Raise More Money!',
    description: 'Learn tips and tricks for hosting a fun and engaging bingo night.',
    content: `Artificial intelligence (AI) is transforming how events are planned, promoted, and optimized—especially when it comes to fundraising. With AI tools, organizers can analyze past event data, predict attendance patterns, and determine which games or prize structures generate the most engagement and revenue. From suggesting the ideal time to host your event to calculating ticket pricing strategies, AI helps take the guesswork out of planning.
  
  AI can also be a powerful tool for marketing your event. Platforms like ChatGPT can help write engaging email campaigns, social media posts, and even ad copy targeted to your audience. Predictive analytics can tell you which channels are most effective for reaching potential attendees or donors, and AI-driven design tools can help create eye-catching flyers, posters, and digital graphics in minutes—no need for a full creative team.
  
  Once your event is live, AI can continue to add value. Use real-time feedback tools and post-event surveys powered by AI to gather insights and improve future planning. You can even automate prize tracking, game rotations, and fundraising totals with the help of smart software. In short, integrating AI into your event strategy can boost efficiency, improve engagement, and ultimately raise more money with less manual effort.`
  },
  
];

const Blog = () => {
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog
  };

  const handleBackClick = () => {
    setSelectedBlog(null); // Reset to show the list of blogs
  };

  return (
    <div className="blog-container">
      {!selectedBlog ? (
        <>
          <h1 className="blog-title">Our Blogs</h1>
          <ul className="blog-list">
            {blogs.map((blog) => (
              <li key={blog.id} className="blog-item">
                <button
                  onClick={() => handleBlogClick(blog)}
                  className="blog-link"
                >
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="blog-content">
          <h1>{selectedBlog.title}</h1>
          <p>{selectedBlog.content}</p>
          <button onClick={handleBackClick} className="back-button">
            Back to Blogs
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;