// RecommendedReading.jsx

const RecommendedReading = ({ onBack }) => {
  const articles = [
    {
      category: "Career & Internships",
      items: [
        {
          title: "Facing Job Market Struggles",
          source: "Investopedia",
          description: "College Majors Seek New Paths to Success",
          url: "https://www.investopedia.com/college-majors-new-paths-to-success-11836468"
        },
        {
          title: "21 Helpful Internship Tips for Success (With Importance)",
          source: "Indeed",
          description: "Understanding how to use your internship effectively may help you improve your career opportunities and build your professional network.",
          url: "https://www.indeed.com/career-advice/starting-new-job/internship-tips"
        }
      ]
    },
    {
      category: "Mental Health & Wellness",
      items: [
        {
          title: "What to Know About Mental Health and College Students",
          source: "WebMD",
          description: "How College Students Can Prevent Mental Health Issues",
          url: "https://www.webmd.com/mental-health/what-to-know-about-mental-health-and-college-students"
        }
      ]
    },
    {
      category: "Academic Success",
      items: [
        {
          title: "How to Be Successful in College: 9 Tips",
          source: "Coursera",
          description: "Recognizing your values, building SMART goals, and knowing your learning style can help put you on the path to success in college.",
          url: "https://www.coursera.org/articles/how-to-be-successful-in-college?msockid=19e1142d518967482caa020f50ee66ad"
        }
      ]
    }
    // Add more categories
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-3">📰 Worth Reading</h1>
        <p className="text-lg opacity-95">
          Articles we found insightful, honest, and helpful. We read a lot so you don't have to.
        </p>
      </div>

      {articles.map((category, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-soft p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{category.category}</h2>
          <div className="space-y-6">
            {category.items.map((article, i) => (
              <div key={i} className="border-l-4 border-blue-400 pl-4 py-2">
                <h3 className="font-bold text-lg text-gray-900 mb-1">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Source: {article.source}</p>
                <p className="text-gray-700 mb-3">{article.description}</p>
                <a 
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1"
                >
                  Read Article →
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Suggestion Box */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-xl p-6 text-center">
        <p className="text-lg text-gray-800 mb-3">
          <span className="text-2xl mr-2">💡</span>
          <strong>Found an article that helped you?</strong>
        </p>
        <p className="text-gray-700 mb-4">Send it our way: support@morethanoneway.org</p>
      </div>
    </div>
  );
};
export default RecommendedReading;