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
        <meta
          name="description"
          content="Feeling completely alone in college is more common than you think. Real ways to find connection on campus and off — no forced advice, just practical options."
        />
        <meta
          name="keywords"
          content="feeling alone in college, college loneliness, how to make friends college, college isolation, college student loneliness"
        />
        <link rel="canonical" href="https://morethanoneway.org/feeling-alone" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button
            onClick={() => navigate('/youre-not-alone')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-tealBrand mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Support Hub
          </button>

          <header className="mb-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                Connection
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              I Feel Completely Alone
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              You’re not alone in feeling alone. That’s the cruel irony — thousands of students feel exactly this way, but everyone is hiding it.
            </p>
          </header>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-4">Where to find connection:</h3>
              <ul className="space-y-3">
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Campus counseling groups</strong> — Many schools offer free support groups for students. You don’t need to be in crisis to go.</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Study groups</strong> — Even if you’re struggling, showing up builds connection. Shared struggle creates bonds.</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Student organizations</strong> — Especially identity-based groups (LGBTQ+, first-gen, cultural orgs). These communities often become chosen family.</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Online communities</strong> — r/college and r/CollegeRant can be surprisingly supportive. Real students, real struggles.</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Wellness center</strong> — Individual counseling helps you process isolation and figure out next steps.</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Campus events</strong> — Even going alone forces small interactions. Sometimes that’s how it starts.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-700 text-base italic leading-relaxed max-w-3xl">
                “I started going to the campus mental health support group even though I was terrified. Everyone there felt as alone as I did. Just knowing I wasn’t the only one drowning made it easier to breathe.”
              </p>
              <p className="text-xs text-gray-600 mt-2">— Jamie, Sophomore</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-3">The thing nobody tells you</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Most people look like they have friends and know what they’re doing. They don’t. They’re performing confidence just like you. The students who seem most connected are often the most isolated inside. You’re not uniquely broken — you’re just being honest with yourself about something most people hide.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-3">If you’ve tried and it’s not working</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Sometimes isolation is a symptom of depression, not just circumstance. If you’ve genuinely tried to connect and nothing sticks, please talk to a counselor. Not because something is wrong with you — because depression literally makes it harder to connect, and that’s treatable.
              </p>
              <p className="text-gray-700 text-sm font-semibold">
                Call or text 988 if you’re in crisis. Campus counseling if you’re not.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('stories')}
              className="w-full bg-white p-5 rounded-2xl text-left hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm hover:-translate-y-[1px] transition-all border border-gray-200"
            >
              <div className="font-semibold text-gray-900 mb-1">
                Read stories from students who felt this way
              </div>
              <div className="text-sm text-gray-600">
                See how other students found connection and built their people
              </div>
            </button>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Connection takes longer than it should.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Keep showing up. The right people are out there. Sometimes finding your people takes longer than anyone admits.
            </p>

            <button
              onClick={() => navigate('/youre-not-alone')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-teal-500 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Support Hub
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeelingAlone;
