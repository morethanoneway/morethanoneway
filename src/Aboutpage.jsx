import React from "react";
import { ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Mail, Share2, Users, MessageCircle, Sparkles } from "lucide-react";

const AboutPage = ({ setCurrentPage }) => {
  return (
    <>
      <Helmet>
        <title>About MoreThanOneWay.org - Why This Site Exists | MoreThanOneWay.org</title>
        <meta name="description" content="Created to help students see that there’s more than one way forward." />
        <meta property="og:title" content="About MoreThanOneWay.org" />
        <meta property="og:description" content="A free, student-focused project — not a corporation, not therapy." />
        <meta
          name="keywords"
          content="about morethanoneway, college student support, mental health resources, why this site exists"
        />
      </Helmet>

      <section className="bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-10">
            {/* HERO */}
            <header className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                Why This Site{" "}
                <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                  Exists
                </span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
                Because someone wanted you to know there’s more than one way forward.
              </p>
            </header>

            {/* MAIN STORY */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-[1.75]">
                <p className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  Students struggling with college often feel like they&apos;re the only ones drowning while everyone else
                  has it figured out. But that&apos;s not true—and this site exists to prove it.
                </p>

                <p className="text-base md:text-lg">
                  The creator of MoreThanOneWay.org is a parent of college students who became deeply concerned about the
                  mental health crisis facing today&apos;s students. Students face overwhelming pressures—difficult
                  professors, family expectations, financial stress, identity struggles, isolation, and watching AI
                  disrupt the career paths they&apos;d planned their futures around.
                </p>

                <p className="text-base md:text-lg">
                  When students are drowning in these pressures, pain makes options invisible. Bright, capable students
                  start believing they&apos;re out of choices. They think if their original plan doesn&apos;t work,
                  they&apos;ve failed. But that is the farthest thing from the truth.
                </p>

                <p className="text-base md:text-lg">
                  She knows this firsthand. She started college in musical theatre on a musical theatre scholarship, then
                  developed vocal nodules and thought her career was over. She pivoted to speech therapy—it seemed
                  logical since she&apos;d spent so much time at speech therapy recovering from the nodules—until she
                  realized that wasn&apos;t for her either.
                </p>

                <p className="text-base md:text-lg">
                  So she went back and got an MA in Theatre because that&apos;s what she loved. After working in theatre
                  for several years, she grew tired of moving from location to location and wanted to put down roots.
                  She assessed her skills: incredibly organized, personable, creative, empathetic—and realized these
                  weren&apos;t “theatre skills,” they were transferable skills that could work anywhere. She wanted
                  something fulfilling—something where she could actually help people facing real challenges.
                </p>

                <p className="text-lg font-bold text-gray-900 text-center">
                  Her path wasn&apos;t linear. It wasn&apos;t what she planned. But it was hers—and it worked.
                </p>

                <p className="text-base md:text-lg">
                  So she built this site. Not as a corporation or charity, but as a parent who wants every student to
                  know:{" "}
                  <span className="font-semibold text-gray-900">
                    You have more choices than you think. There really is more than one way forward.
                  </span>
                </p>

                <p className="text-base md:text-lg">
                  This isn&apos;t about toxic positivity or pretending college is easy. It&apos;s about showing students
                  the practical paths, resources, and support that exist—especially when everything feels impossible.
                </p>

                <div className="rounded-xl bg-[#FFFBF7] border border-gray-200 p-4 text-center">
                  <p className="text-base md:text-lg font-semibold text-gray-900">
                    Sometimes the pathway forward is just information you don&apos;t have yet.
                  </p>
                </div>
              </div>
            </div>

            {/* SHARE YOUR STORY (NEW STYLE CARD) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-8 h-8 text-tealBrand/80 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                    Your story could save someone
                  </h2>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    Right now, there&apos;s a student staring at their screen, convinced they&apos;re the only one
                    struggling. Your story can show them they&apos;re not alone.
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-[#FFFBF7] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">What we collect</p>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        Real stories: academic struggles, job search hell, mental health battles, family pressure,
                        financial stress, career pivots.
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-[#FFFBF7] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">What it is not</p>
                      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                        Not perfect success stories. Not “look how amazing I am.” Just survival stories.
                      </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-[#FFFBF7] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Privacy promise</p>
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        <li>• Anonymous option</li>
                        <li>• Preview before posting</li>
                        <li>• Email never shared</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
 <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSex5f-hLh3ygRkdsLeE33vxmE7WUiajozBZtpFCczxBK8SpMQ/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-tealBrand/90 text-white px-6 py-3 rounded-xl font-bold hover:bg-tealBrand transition shadow-soft"
                      >
                        Share Your Story <ExternalLink className="w-4 h-4" />
                      </a>
                    
                    <p className="text-xs text-gray-600 italic">
                      It doesn&apos;t need to be perfect. Just honest.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* OTHER WAYS TO HELP */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Other ways you can help</h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-tealBrand/80" />
                    <h3 className="font-bold text-gray-900">Share the site</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    Know a student who&apos;s struggling? Send them the site. Share it in places students actually are.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-tealBrand/80" />
                    <h3 className="font-bold text-gray-900">Tell real students</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    RA, professor, advisor, career counselor—add MTOW to your resource list for the students who feel stuck.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-tealBrand/80" />
                    <h3 className="font-bold text-gray-900">Give feedback</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">
                    If something could be better—or you notice a missing resource—tell us. This site exists to help.
                  </p>
                </div>
              </div>
            </div>

            {/* WHAT WE'RE BUILDING */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-tealBrand/80 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">What we&apos;re building</h2>
                  <p className="mt-2 text-gray-700">
                    Built slowly, with care. Here&apos;s what&apos;s coming:
                  </p>

                  <ul className="mt-5 space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-1">•</span>
                      <span>More career paths (expanding beyond engineering to all majors)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-1">•</span>
                      <span>More student stories (the real, messy ones)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-1">•</span>
                      <span>Better job search tools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 mt-1">•</span>
                      <span>Mental health resources (because this stuff is connected)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-2xl bg-[#FFFBF7] border border-gray-200 flex items-center justify-center">
                <Mail className="w-6 h-6 text-tealBrand/80" />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900">Want to get in touch?</h2>
              <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
                Questions, suggestions, partnerships, or resources you want added—send a note.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="inline-flex items-center justify-center bg-tealBrand/90 text-white px-8 py-3 rounded-xl font-bold hover:bg-tealBrand transition"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* FINAL THANK YOU */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10 text-center">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">Thank you</h3>
              <p className="mt-3 text-gray-700 max-w-2xl mx-auto leading-relaxed">
                For reading this. For caring about students. For being here.
              </p>
              <p className="mt-2 text-gray-700">
                Together, we can help students find a way forward.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
