import React from 'react';
import { Heart, Users, TrendingUp, Briefcase, ChevronRight, Phone, MessageCircle, BookOpen, Search, FileText } from 'lucide-react';

const WarmHomePage = ({ setCurrentPage }) => {
  return (
    <div className="space-y-12">
      {/* Warm Crisis Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-5 rounded-xl shadow-soft">
        <div className="flex items-start gap-3">
          <span className="text-3xl">☎️</span>
          <div>
            <h3 className="font-bold text-red-800 mb-1">Need someone right now?</h3>
            <p className="text-red-700 text-sm mb-2">
              <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (24/7)<br />
              <strong>Crisis Text Line:</strong> Text HOME to 741741
            </p>
            <p className="text-xs text-red-600 italic">
              You matter. This feeling is temporary. People want to help. ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section - Warm and Inviting */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-10"></div>
        <div className="relative px-8 py-16 text-center">
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            You Have More Choices <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              Than You Think
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Struggling with school? Job search going nowhere? Feeling stuck? 
            <strong> You're not alone</strong>, and this isn't the end of your story. 💪
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('youre-not-alone')}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg"
            >
              I'm Struggling Right Now →
            </button>
            <button 
              onClick={() => setCurrentPage('stories')}
              className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 border-2 border-gray-200 transform hover:scale-105 transition-all shadow-md"
            >
              Read Real Stories 📖
            </button>
          </div>
        </div>
      </div>

          {/* Student Quote */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-400 p-6 rounded-2xl shadow-soft">
        <div className="flex gap-3">
          <span className="text-4xl">💭</span>
          <div>
            <p className="text-gray-800 italic text-lg leading-relaxed mb-2">
              "I thought I was the only one drowning. Everyone else seemed fine. Struggling doesn't mean failing—it just means I'm human."
            </p>
            <p className="text-sm text-gray-600">- Alex M., Junior, Computer Science</p>
          </div>
        </div>
      </div>

      {/* Three Main Cards with Warm Colors */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl shadow-soft border-l-4 border-purple-400 hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">You're Not Alone</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Thousands of students feel exactly like you do. Read their stories and see how they made it through—
            not because they were special, but because they kept going.
          </p>
          <button 
            onClick={() => setCurrentPage('stories')} 
            className="text-purple-600 font-semibold hover:text-purple-700 flex items-center group"
          >
           Read Stories <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-soft border-l-4 border-orange-400 hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Different Paths Work</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your major doesn't lock you in. See what adjacent careers are actually hiring—
            and how your "wrong" degree might be exactly what they need.
          </p>
          <button 
            onClick={() => setCurrentPage('pivot')} 
            className="text-orange-600 font-semibold hover:text-orange-700 flex items-center group"
          >
           Find Your Path <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-soft border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Track Your Progress</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Job searching is brutal. Track your applications and celebrate small wins—
            every single one is progress, even when it doesn't feel like it. 
          </p>
          <button 
            onClick={() => setCurrentPage('tracker')} 
            className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group"
          >
           Start Tracking <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Another Student Quote */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-2xl shadow-soft">
        <div className="flex gap-3">
          <span className="text-4xl">💪</span>
          <div>
            <p className="text-gray-800 italic text-lg leading-relaxed mb-2">
              "After 200+ applications with barely any responses, I was ready to give up. 
              The system is broken, not me. Two months later, I got three offers."
            </p>
            <p className="text-sm text-gray-600">- Sarah K., Recent Grad, English Major → Technical Writer</p>
          </div>
        </div>
      </div>

      {/* Resources Grid - Warm Version */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-8 shadow-soft">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Everything You Need in One Place 📚</h2>
        <p className="text-gray-600 mb-6">Because you shouldn't have to search 50 websites when you're already overwhelmed.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentPage('find-internships')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Find Internships & Co-ops</h3>
            </div>
            <p className="text-sm text-gray-600">Pre-filtered searches so you don't waste time on "5 years experience required"</p>
          </button>

          <button
            onClick={() => setCurrentPage('study-resources')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-gray-800">Free Study Resources</h3>
            </div>
            <p className="text-sm text-gray-600">Can't understand your professor? Try these YouTube channels (100% free)</p>
          </button>

          <button
            onClick={() => setCurrentPage('resume-builder')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-800">Resume Builder</h3>
            </div>
            <p className="text-sm text-gray-600">Turn your class projects into professional experience (yes, really)</p>
          </button>

          <button
            onClick={() => setCurrentPage('interview-prep')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-800">Interview Prep</h3>
            </div>
            <p className="text-sm text-gray-600">Common questions + how to answer them without sounding like a robot</p>
          </button>
        </div>
      </div>

      {/* The Honest Truth Section - Warmer Version */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-soft">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-4xl">💯</span>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">The Honest Truth</h3>
            <p className="text-sm text-gray-600 italic">Because sugarcoating doesn't help when you're struggling</p>
          </div>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-lg">📅</span>
            <span>The average job search takes <strong>6-8 months</strong>. That's normal. You're not slow.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">📧</span>
            <span>Most students send <strong>100+ applications</strong> before getting offers. You're not doing it wrong.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">📚</span>
            <span>Some fields are genuinely oversaturated. That's <strong>not your fault</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">🛤️</span>
            <span>Taking a non-linear path doesn't mean you failed. It means you're <strong>adapting</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">❤️</span>
            <span>Your worth is <strong>not</strong> determined by your job, your GPA, or your major.</span>
          </li>
        </ul>
      </div>

      {/* Final Encouragement */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl p-10 text-center shadow-xl">
        <div className="text-5xl mb-4">🌈</div>
        <h3 className="text-3xl font-bold mb-4">There's More Than One Way</h3>
        <p className="text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-95">
          Failed a class? 200 rejections? Feeling lost? None of that means your story is over. 
          It just means you're on a different path than you expected—and that's okay.
        </p>
        <p className="text-lg opacity-90">
          Keep going. You're doing better than you think. 💪
        </p>
      </div>

      {/* Need Help Now - Always Visible */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-8 text-center shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Phone className="w-6 h-6" />
          <h3 className="text-2xl font-bold">In Crisis? We're Here 24/7</h3>
        </div>
        <p className="text-lg mb-4 opacity-95">
          <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988<br />
          <strong>Crisis Text Line:</strong> Text HOME to 741741
        </p>
        <button
          onClick={() => setCurrentPage('crisis')}
          className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-red-50 transform hover:scale-105 transition-all shadow-lg"
        >
          View All Crisis Resources →
        </button>
      </div>
    </div>
  );
};

// Add this to your global CSS or in a <style> tag
const warmStyles = `
  .shadow-soft {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  
  .shadow-lg {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  }
  
  .shadow-xl {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

export default WarmHomePage;