import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';

const FeelingAlone = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Feeling Alone in College — How to Find Real Connection | MoreThanOneWay.org</title>
        <meta name="description" content="Feeling completely alone in college is more common than you think. Real ways to find connection on campus and off — no forced advice, just practical options." />
        <meta name="keywords" content="feeling alone in college, college loneliness, how to make friends college, college isolation, college student loneliness" />
        <link rel="canonical" href="https://morethanoneway.org/feeling-alone" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-700" />
              </div>
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">Connection</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I Feel Completely Alone</h1>
            <p className="mt-3 text-lg text-gray-600">You're not alone in feeling alone. That's the cruel irony — thousands of students feel exactly this way, but everyone's hiding it.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-400">
              <h3 className="font-bold text-gray-900 mb-3">Where to find connection:</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li><strong>Campus counseling groups</strong> — Many schools offer free support groups for students. You don't need to be in crisis to go.</li>
                <li><strong>Study groups</strong> — Even if you're struggling, showing up builds connection. The shared struggle creates bonds.</li>
                <li><strong>Student organizations</strong> — Especially identity-based groups (LGBTQ+, first-gen, cultural orgs). These communities often become chosen family.</li>
                <li><strong>Online communities</strong> — r/college and r/CollegeRant can be surprisingly supportive. Real students, real struggles.</li>
                <li><strong>Wellness center</strong> — Individual counseling helps you process isolation and figure out next steps.</li>
                <li><strong>Campus events</strong> — Even going alone to something forces small interactions. Sometimes that's how it starts.</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "I started going to the campus mental health support group even though I was terrified. Everyone there felt as alone as I did. Just knowing I wasn't the only one drowning made it easier to breathe."
              </p>
              <p className="text-xs text-gray-600 mt-2">— Jamie, Sophomore</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">The thing nobody tells you</h3>
              <p className="text-gray-700 text-sm leading-relaxed">Most people look like they have friends and know what they're doing. They don't. They're performing confidence just like you. The students who seem most connected are often the most isolated inside. You're not uniquely broken — you're just being honest with yourself about something most people hide.</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-5 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">If you've tried and it's not working</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-2">Sometimes isolation is a symptom of depression, not just circumstance. If you've genuinely tried to connect and nothing sticks, please talk to a counselor. Not because something is wrong with you — because depression literally makes it harder to connect, and that's treatable.</p>
              <p className="text-gray-700 text-sm font-semibold">Call or text 988 if you're in crisis. Campus counseling if you're not.</p>
            </div>
            <button onClick={() => setCurrentPage('stories')} className="text-purple-700 font-semibold hover:text-purple-800 flex items-center gap-1 text-sm">
              Read stories from students who felt this way and found their people →
            </button>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">Connection takes longer than it should. That's not your fault.</p>
            <p className="text-white/85 text-sm">Keep showing up. The right people are out there.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default FeelingAlone;
