/**
 * Every article on the blog, in reading order.
 *
 * Single source of truth: the index page, the individual article pages, the
 * prerenderer, the sitemap and llms.txt all read from here, so adding an
 * article means adding one entry and nothing else.
 *
 * Bold runs inside body text are written as **like this** and split out at
 * render time. It keeps the content readable as prose rather than as markup,
 * and avoids putting raw HTML anywhere near a page we render as-is.
 */

/** The generated cover artwork. Cycles so neighbouring cards never match. */
export type CoverPattern = 'dots' | 'grid' | 'diagonal' | 'rings' | 'weave' | 'ticks';

export interface BlogBlock {
  type: 'p' | 'ul';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  /** Two-digit label shown on the cover, matching the order they were written. */
  number: string;
  category: string;
  title: string;
  /** Meta description, and the standfirst on the index card. */
  description: string;
  pattern: CoverPattern;
  blocks: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ssdi-ssi-va-workers-comp-difference",
    number: "01",
    category: "The basics",
    title: "SSDI, SSI, VA Disability, Workers' Comp: What's the Difference, and Which One Is Mine?",
    description: "A plain-language guide to the four main disability benefit programs, who each one is for, and why you might qualify for more than one.",
    pattern: "dots",
    blocks: [
      {
        type: "p",
        text: "If your head is spinning from all the acronyms, you're not alone. Most people applying for benefits have never had to learn this alphabet before, and nobody teaches it in school. Here's the simple version:",
      },
      {
        type: "ul",
        items: [
          "**SSDI (Social Security Disability Insurance)** is for people who worked and paid Social Security taxes, and can no longer work because of a medical condition. Think of it like an insurance policy you paid into with every paycheck.",
          "**SSI (Supplemental Security Income)** is for people with limited income and resources, whether they worked much or not. It's based on financial need.",
          "**VA Disability** is for veterans whose injury or illness is connected to their military service, whether it happened during combat or during ordinary duty.",
          "**Workers' Compensation** is for people who got hurt, or got sick, because of their job. It's usually handled at the state level.",
        ],
      },
      {
        type: "p",
        text: "Some people qualify for more than one program at the same time. A veteran who was also injured at a civilian job, for example, might have both a VA claim and a workers' comp claim moving forward together.",
      },
      {
        type: "p",
        text: "You don't have to figure this out alone. A good attorney will look at your full story, identify every program you may qualify for, and help you move through each one in the right order, so nothing falls through the cracks.",
      },
    ],
  },
  {
    slug: "am-i-eligible-to-apply",
    number: "02",
    category: "Getting started",
    title: "Am I Actually Eligible to Apply?",
    description: "More people are eligible for disability benefits than think they are. A simple way to work out whether it's worth applying.",
    pattern: "grid",
    blocks: [
      {
        type: "p",
        text: "This is almost always the first question on a claimant's mind, and it's a fair one. The honest answer is that more people are eligible than they think, so it's almost always worth applying rather than guessing yourself out of benefits you may deserve.",
      },
      {
        type: "p",
        text: "Here's a simple way to think about it:",
      },
      {
        type: "ul",
        items: [
          "**For SSDI**, you generally need to have worked and paid into Social Security for a certain number of years, and have a medical condition that stops you from doing full-time work for at least 12 months (or is expected to).",
          "**For SSI**, you need limited income and resources, and a qualifying disability, or in some cases, be 65 or older.",
          "**For VA disability**, you need a current medical condition that is connected to your time in service, even if it showed up years later.",
          "**For workers' comp**, you generally need an injury or illness that happened because of your job, reported within your state's deadline.",
        ],
      },
      {
        type: "p",
        text: "You don't need to already have all the proof gathered to apply. Applying is simply the first step. Many people delay applying because they're afraid they'll be told no, but a denial happens to a lot of people who go on to win their case later.",
      },
      {
        type: "p",
        text: "An experienced attorney can often spot eligibility paths you wouldn't have considered on your own, which is one reason early legal guidance tends to save time and frustration down the line.",
      },
    ],
  },
  {
    slug: "what-happens-after-you-apply",
    number: "03",
    category: "After you apply",
    title: "I Just Applied. What Happens Now?",
    description: "What actually happens to your application once you submit it, how long the quiet stretch lasts, and what to do while you wait.",
    pattern: "diagonal",
    blocks: [
      {
        type: "p",
        text: "Once you submit your application, it moves through a specific process, even if that process feels slow and quiet from the outside.",
      },
      {
        type: "p",
        text: "Here's generally what happens next:",
      },
      {
        type: "ul",
        items: [
          "Your application is assigned to an examiner or adjuster who reviews your paperwork and medical records.",
          "They may request more records directly from your doctors, or ask you to attend an exam with a doctor they choose (sometimes called a consultative exam for VA claims).",
          "They compare what they find against the rules for your specific program.",
          "They mail you a decision letter, either approving your claim, or explaining the reasons for denial.",
        ],
      },
      {
        type: "p",
        text: "This stage usually takes a few months, and that waiting period is completely normal. The best thing you can do during this time is keep going to your medical appointments, keep a simple log of your symptoms, and respond quickly if the agency asks you for anything.",
      },
      {
        type: "p",
        text: "Silence from them almost always simply means they're still working on your file. Having an attorney during this stage means someone is actively monitoring your case and making sure nothing stalls without your knowledge.",
      },
    ],
  },
  {
    slug: "denied-does-that-mean-no-chance",
    number: "04",
    category: "If you're denied",
    title: "I Was Denied. Does That Mean I Have No Chance?",
    description: "A denial is not the end of your claim. Why denials happen, and the one thing that matters most in the days right after one.",
    pattern: "rings",
    blocks: [
      {
        type: "p",
        text: "Take a breath. A denial letter is scary to open, but your story is far from over. In fact, a large number of claims that eventually get approved were denied at least once along the way. It's simply how the process is built.",
      },
      {
        type: "p",
        text: "A denial usually happens for reasons like:",
      },
      {
        type: "ul",
        items: [
          "The file didn't have enough medical evidence yet to prove how serious your condition is.",
          "A form was incomplete, unclear, or missing important details.",
          "The reviewer applied a technical rule that a stronger explanation could have addressed.",
          "The case genuinely needs a judge, rather than a paper reviewer, to hear your full story.",
        ],
      },
      {
        type: "p",
        text: "What matters most right now is speed and action. Every program gives you a specific window of time to appeal, often 60 days, and missing that window can force you to start completely over.",
      },
      {
        type: "p",
        text: "So the very next step, as soon as you get a denial, is simple: read the letter carefully for the deadline, and reach out for help right away. Attorneys who specialize in disability claims can often pinpoint exactly why a denial happened and build a sharper, better-supported case for the next stage.",
      },
    ],
  },
  {
    slug: "what-is-an-appeal-how-to-file",
    number: "05",
    category: "The appeal",
    title: "What Is an Appeal, and How Do I Actually File One?",
    description: "The four stages of a disability appeal explained, and why the deadline matters more than anything else.",
    pattern: "weave",
    blocks: [
      {
        type: "p",
        text: "An appeal is simply your chance to say, “I don't agree with this decision, and here's more information to consider.” It's a normal, built-in part of the system, and there's nothing to feel embarrassed about needing it.",
      },
      {
        type: "p",
        text: "While the exact names of the steps differ slightly between SSDI/SSI, VA, and workers' comp, the appeal journey usually looks something like this:",
      },
      {
        type: "ul",
        items: [
          "**Step 1 — Reconsideration:** A different reviewer looks at your file again, along with anything new you add.",
          "**Step 2 — Hearing:** You get to explain your situation directly to a judge, in person, by phone, or by video.",
          "**Step 3 — Higher Review:** A higher appeals board can review the judge's decision if you believe it needs a second look.",
          "**Step 4 — Court:** In rare cases, a case can go all the way to federal court.",
        ],
      },
      {
        type: "p",
        text: "The single most important rule at every step is the deadline. Mark it on a calendar the moment you get a letter, and don't wait until the last week to start.",
      },
      {
        type: "p",
        text: "Claimants who have legal representation at the appeal stage tend to move through it faster and with stronger results, because an attorney already knows which forms to file, which evidence to add, and how to meet every deadline without scrambling.",
      },
    ],
  },
  {
    slug: "do-i-need-help-with-my-claim",
    number: "06",
    category: "Getting help",
    title: "Do I Really Need Someone to Help Me With This?",
    description: "You are allowed to handle a claim alone. What an attorney actually does, and how the fees work for Social Security claims.",
    pattern: "ticks",
    blocks: [
      {
        type: "p",
        text: "Technically, you're allowed to handle your claim entirely on your own. But here's the honest truth: this process was never designed to be simple, and you shouldn't have to become an expert in it while you're also dealing with a serious health condition.",
      },
      {
        type: "p",
        text: "A good attorney can help you by:",
      },
      {
        type: "ul",
        items: [
          "Making sure every form is filled out completely and accurately, the first time.",
          "Knowing exactly which medical records actually matter, and requesting them for you.",
          "Explaining confusing letters and deadlines in plain language.",
          "Preparing you for what a hearing will actually feel like, so nothing catches you off guard.",
          "Speaking on your behalf when you're too exhausted, too sick, or too overwhelmed to fight every battle yourself.",
        ],
      },
      {
        type: "p",
        text: "For Social Security claims, most attorneys only get paid if you win, and the fee is capped and taken from your back pay, rather than out of your pocket up front. For VA and workers' comp, similar protections often apply.",
      },
      {
        type: "p",
        text: "Getting legal help simply means bringing in someone who already knows the terrain, so you can spend your own energy on getting better.",
      },
    ],
  },
  {
    slug: "what-medical-proof-do-i-need",
    number: "07",
    category: "Proving your case",
    title: "What Kind of Medical Proof Do I Actually Need?",
    description: "The evidence that wins disability claims, and a simple test for whether your file tells the same story your body is living.",
    pattern: "dots",
    blocks: [
      {
        type: "p",
        text: "This is where a lot of claims are won or lost, so it deserves real attention. The good news is you just need your medical story told clearly and consistently.",
      },
      {
        type: "p",
        text: "Strong evidence usually includes:",
      },
      {
        type: "ul",
        items: [
          "Notes from every doctor, therapist, or specialist you see, apart from your main one.",
          "Test results such as imaging, bloodwork, or evaluations that show what's actually happening in your body or mind.",
          "A clear statement from a treating doctor about what you can and cannot do because of your condition.",
          "A record of medications you've tried, and any side effects, even ones that didn't help.",
          "Notes about missed appointments or gaps in treatment, along with the real reason why (cost, transportation, fear).",
        ],
      },
      {
        type: "p",
        text: "Here's a simple way to think about it: the file should tell the same story your body is living every day. If you feel like something important is missing from your records, say so.",
      },
      {
        type: "p",
        text: "An experienced attorney will know exactly which records to chase, which doctors to follow up with, and how to present everything so the person reviewing your case sees the full, accurate picture.",
      },
    ],
  },
  {
    slug: "what-is-a-function-report",
    number: "08",
    category: "Telling your story",
    title: "What Is a Function Report, and Why Does It Matter So Much?",
    description: "The Function Report is one of the only places a decision maker hears directly from you. How to answer it well.",
    pattern: "grid",
    blocks: [
      {
        type: "p",
        text: "A Function Report is a form where you describe, in your own words, what your daily life actually looks like now, things like getting dressed, cooking, sleeping, and concentrating. It matters enormously, because it's one of the only places in the entire process where the decision maker hears directly from you.",
      },
      {
        type: "p",
        text: "A common mistake is answering too briefly, almost like a checklist, because it feels embarrassing to admit how hard things have become. Try to avoid that. Instead:",
      },
      {
        type: "ul",
        items: [
          "**Be specific.** Instead of “I can cook,” try “I can microwave simple meals, but I can't stand long enough to cook a full dinner.”",
          "Describe bad days honestly, alongside your better moments.",
          "Explain how long tasks take you now, compared to before.",
          "Mention if you need reminders, breaks, or help from someone else.",
        ],
      },
      {
        type: "p",
        text: "Think of it this way: nobody watching you live your life gets to see the version of you at 2 a.m. when the pain won't let you sleep, or the third time you had to sit down while folding laundry. This form is your chance to describe that reality clearly and honestly.",
      },
      {
        type: "p",
        text: "Many attorneys review these forms with their clients before submission, which helps make sure nothing important is left out and every answer is consistent with the medical record.",
      },
    ],
  },
  {
    slug: "why-work-history-details-matter",
    number: "09",
    category: "Your work history",
    title: "Why Do the Small Details of My Old Jobs Matter So Much?",
    description: "Two people with the same job title can have very different days. Why the details of your past work decide your claim.",
    pattern: "diagonal",
    blocks: [
      {
        type: "p",
        text: "It might feel strange to be asked detailed questions about a job you had years ago, especially one you can no longer do. But these details matter more than you'd expect, because they help determine whether any job in the whole economy still fits what your body and mind can currently handle.",
      },
      {
        type: "p",
        text: "When describing past work, try to include:",
      },
      {
        type: "ul",
        items: [
          "How much you typically lifted or carried, and how often.",
          "Whether you were mostly standing, sitting, or moving around.",
          "Whether you supervised others or worked mostly on your own.",
          "How much focus, memory, or fast decision-making the job required.",
        ],
      },
      {
        type: "p",
        text: "Saying simply “I was a cashier” or “I worked in a warehouse” leaves out the exact information that matters most. Two people with the same job title can have very different day-to-day demands.",
      },
      {
        type: "p",
        text: "A skilled attorney knows how to draw out these details during intake and present them in a way that accurately reflects how demanding your past work really was, which strengthens the argument that returning to it simply isn't realistic.",
      },
    ],
  },
  {
    slug: "what-happens-at-a-disability-hearing",
    number: "10",
    category: "The hearing",
    title: "What Actually Happens at a Disability Hearing?",
    description: "A disability hearing is calmer and more human than most people expect. Here is what the day actually looks like.",
    pattern: "rings",
    blocks: [
      {
        type: "p",
        text: "The word “hearing” can sound intimidating, like something out of a courtroom drama. The reality is much calmer, and much more human, than most people expect.",
      },
      {
        type: "p",
        text: "Here's what usually happens:",
      },
      {
        type: "ul",
        items: [
          "You'll meet the judge, who may be in the room with you, or connected by phone or video.",
          "You'll be asked simple, direct questions about your health, your daily life, and your work history.",
          "Your attorney may also ask you a few questions, to make sure your story comes through clearly.",
          "In many cases, a vocational expert will also speak, discussing what kind of work, if any, someone with your limitations could do.",
          "The whole thing usually lasts well under an hour.",
        ],
      },
      {
        type: "p",
        text: "The judge's real goal is simply to understand your life accurately enough to make a fair decision. The single best thing you can do is answer honestly, in your own words, even if an answer is “it depends on the day” or “I'm not totally sure.”",
      },
      {
        type: "p",
        text: "Having an attorney beside you means someone is there to guide the conversation, clarify anything confusing, and make sure the judge hears the parts of your story that matter most.",
      },
    ],
  },
  {
    slug: "what-questions-will-i-be-asked",
    number: "11",
    category: "The hearing",
    title: "What Kinds of Questions Will I Be Asked?",
    description: "The questions that come up at almost every disability hearing, and a simple way to answer them well.",
    pattern: "weave",
    blocks: [
      {
        type: "p",
        text: "Not knowing what you'll be asked is one of the biggest sources of pre-hearing anxiety, so let's take some of that mystery away right now.",
      },
      {
        type: "p",
        text: "Most hearings include some version of these questions:",
      },
      {
        type: "ul",
        items: [
          "“Walk me through a typical day for you.”",
          "“How long can you sit, stand, or walk before you need a break?”",
          "“What happens on your bad days, versus your better days?”",
          "“What medications are you taking, and do they cause any side effects?”",
          "“Why did you stop working, specifically?”",
          "“Do you need help with things like cooking, cleaning, or driving?”",
        ],
      },
      {
        type: "p",
        text: "There are no trick questions hiding in this list. The judge simply wants an honest, clear picture of your everyday reality. A helpful approach: instead of describing feelings alone (“I'm in pain”), try adding a concrete detail (“I'm in pain, and I can't stand at the sink for more than ten minutes before I need to sit”).",
      },
      {
        type: "p",
        text: "Most attorneys walk through these exact questions with their clients beforehand, so that nothing on the actual day feels unfamiliar.",
      },
    ],
  },
  {
    slug: "who-is-the-vocational-expert",
    number: "12",
    category: "The hearing",
    title: "Who Is the “Vocational Expert,” and Why Are They at My Disability Hearing?",
    description: "The vocational expert answers one question: is there any job left you could still do? How that exchange actually works.",
    pattern: "ticks",
    blocks: [
      {
        type: "p",
        text: "A vocational expert is a person who studies jobs for a living, including what different jobs require physically and mentally, and how many of those jobs exist in the country. They're brought into your hearing to help the judge answer one very specific question: given everything your body and mind can no longer do, is there truly any job left that you could still perform?",
      },
      {
        type: "p",
        text: "Here's how it typically works:",
      },
      {
        type: "ul",
        items: [
          "The judge describes a hypothetical person with certain limitations (based on your case).",
          "The vocational expert says whether jobs exist for someone with those exact limitations.",
          "Your attorney can then add back any limitations that were left out, and ask again.",
        ],
      },
      {
        type: "p",
        text: "This part can sound technical, almost like its own language, but you don't need to worry about following every word. Your job is simply to have told your story honestly earlier in the hearing.",
      },
      {
        type: "p",
        text: "Your attorney's job is to make sure the vocational expert's answer accurately reflects your true, full limitations, and experienced attorneys know exactly which follow-up questions will strengthen your case the most.",
      },
    ],
  },
  {
    slug: "how-long-will-this-take",
    number: "13",
    category: "The timeline",
    title: "How Long Is This Whole Thing Going to Take?",
    description: "Realistic timelines for each stage of a disability claim, from the first decision through to a hearing result.",
    pattern: "dots",
    blocks: [
      {
        type: "p",
        text: "Not knowing how long you'll have to wait is one of the hardest parts of the whole journey. It's fair to want a straight answer, so here's a realistic one.",
      },
      {
        type: "p",
        text: "Generally speaking:",
      },
      {
        type: "ul",
        items: [
          "An initial decision often takes **3 to 6 months**.",
          "If you need to appeal, that first appeal review can take **another few months**.",
          "Getting a hearing scheduled in front of a judge can take **9 to 18 months**, depending on where you live.",
          "After the hearing, a final decision usually arrives within **2 to 4 months**.",
        ],
      },
      {
        type: "p",
        text: "Added all together, it can realistically take a year or more from start to finish, especially if an appeal is needed. That is genuinely hard to hear, and it's okay to feel frustrated by it.",
      },
      {
        type: "p",
        text: "What helps most during the wait is having a plan: knowing what phase you're currently in, what's supposed to happen next, and who to call if something feels stuck. Claimants with legal representation often move through the process more efficiently, because their attorney is tracking every deadline and pushing things forward behind the scenes.",
      },
    ],
  },
  {
    slug: "what-happens-if-i-win",
    number: "14",
    category: "Good news",
    title: "What Happens If I Win My Case?",
    description: "Award letters, back pay, and when health coverage begins. What arrives after a disability claim is approved.",
    pattern: "grid",
    blocks: [
      {
        type: "p",
        text: "Congratulations. Winning a disability case is real relief after what is usually a long, exhausting road. Here's what typically comes next.",
      },
      {
        type: "p",
        text: "Once you're approved:",
      },
      {
        type: "ul",
        items: [
          "You'll receive an official award letter explaining your benefit amount and start date.",
          "You may receive back pay, covering the months you waited during the process.",
          "For SSDI, there's often a waiting period before Medicare coverage begins; for SSI, Medicaid coverage may start right away.",
          "For VA claims, your disability rating will be listed clearly, along with your monthly payment amount.",
          "For workers' comp, you'll receive details about ongoing wage-replacement or settlement terms.",
        ],
      },
      {
        type: "p",
        text: "It's completely normal to have follow-up questions once the letter arrives, about taxes, about other benefits, about what happens if your condition changes later. Ask them.",
      },
      {
        type: "p",
        text: "A good attorney stays available after your case is approved, because understanding your award fully is part of finishing the job properly. You made it through an incredibly difficult process, and that deserves real recognition.",
      },
    ],
  },
  {
    slug: "partially-approved-what-it-means",
    number: "15",
    category: "Partial wins",
    title: "I Was Only Partially Approved. What Does That Actually Mean?",
    description: "A partial approval can be appealed on the part you disagree with, while keeping what you have already won.",
    pattern: "diagonal",
    blocks: [
      {
        type: "p",
        text: "A partially favorable decision can feel confusing, sometimes even more confusing than a denial, because the outcome sits somewhere in between. Here's what's usually going on.",
      },
      {
        type: "p",
        text: "A partial approval commonly means one of these things:",
      },
      {
        type: "ul",
        items: [
          "You were approved, but starting from a **later date** than you originally requested.",
          "You were approved for **one program** (like SSI) but not another (like SSDI) in the same claim.",
          "Your VA rating was granted, but at a **lower percentage** than you believe is accurate.",
          "Your workers' comp claim was accepted for **some injuries, but not all** of them.",
        ],
      },
      {
        type: "p",
        text: "The important thing to know is that a partial approval can often still be appealed on the specific part you disagree with, while keeping the part that was already approved safe. If something about the decision doesn't match your reality, it's worth a closer look.",
      },
      {
        type: "p",
        text: "An attorney can review the decision quickly and tell you whether pursuing that additional piece is realistic, and often a partial win is simply one more step away from the full outcome you deserve.",
      },
    ],
  },
  {
    slug: "denied-again-after-hearing",
    number: "16",
    category: "If it happens again",
    title: "What If I Get Denied Again, Even After a Hearing?",
    description: "The paths that remain after a second denial, including Appeals Council review, federal court, and starting a stronger claim.",
    pattern: "rings",
    blocks: [
      {
        type: "p",
        text: "This is a discouraging moment, and it's completely okay to feel that way. Even here, there are still paths forward, and plenty of people find success on this next stretch of the journey.",
      },
      {
        type: "p",
        text: "Depending on your program, your options generally include:",
      },
      {
        type: "ul",
        items: [
          "**Appeals Council review**, where a higher board looks specifically for legal or factual errors in the judge's decision.",
          "**Federal court review**, where a federal judge can review the entire record in more serious or complex cases.",
          "**A new application**, since sometimes, especially if your condition has worsened, starting a new, stronger claim makes more sense than continuing to appeal an old one.",
          "**VA Board of Veterans' Appeals** or higher-level review, specific to VA claims, offering another structured path forward.",
        ],
      },
      {
        type: "p",
        text: "The right choice depends entirely on the specific facts of your case, which is exactly the kind of decision worth talking through with an experienced attorney.",
      },
      {
        type: "p",
        text: "A second denial is a real setback, but the strongest next move is usually building a more complete case around the exact gaps this attempt revealed, and that's the kind of targeted strategy legal experience makes possible.",
      },
    ],
  },
  {
    slug: "va-claim-vs-ssdi-ssi",
    number: "17",
    category: "VA claims",
    title: "How Is a VA Disability Claim Different From SSDI or SSI?",
    description: "VA ratings, C&P exams, and service connection, and how a VA rating can strengthen a Social Security claim.",
    pattern: "weave",
    blocks: [
      {
        type: "p",
        text: "If you're a veteran, you may be juggling a VA claim alongside Social Security, and it helps to understand how they're actually different, even though both involve disability.",
      },
      {
        type: "p",
        text: "Here are the key differences to know:",
      },
      {
        type: "ul",
        items: [
          "VA claims are based on a **rating system**, from 0% to 100%, reflecting how much your service-connected condition affects your life. Social Security works more like an all-or-nothing decision.",
          "You may be asked to attend a **C&P exam** (Compensation and Pension exam), similar to Social Security's consultative exam.",
          "VA claims specifically require your condition to be **connected to your military service**, even if it wasn't diagnosed until years later.",
          "You can often qualify for **both VA disability and SSDI or SSI** at the same time, since they're separate systems that don't cancel each other out.",
        ],
      },
      {
        type: "p",
        text: "One more thing worth knowing: a VA disability rating can sometimes actually help support a Social Security claim, because it shows an official government agency has already documented how serious your condition is.",
      },
      {
        type: "p",
        text: "If you're navigating both systems at once, working with an attorney who understands both can help you use each one to strengthen the other.",
      },
    ],
  },
  {
    slug: "workers-comp-how-it-fits",
    number: "18",
    category: "Workers' comp",
    title: "I Was Hurt at Work. How Does Workers' Comp Fit Into All This?",
    description: "Workers' comp runs on state rules and short deadlines. What to do first, and how it interacts with SSDI.",
    pattern: "ticks",
    blocks: [
      {
        type: "p",
        text: "Getting injured on the job comes with its own separate system, called workers' compensation, and it works a little differently from Social Security or VA benefits.",
      },
      {
        type: "p",
        text: "Here's what's important to understand:",
      },
      {
        type: "ul",
        items: [
          "Workers' comp is generally run by **your state**, so rules vary depending on where you live.",
          "It usually covers both your **medical treatment** and a portion of your **lost wages** while you recover.",
          "You typically must **report the injury within a specific deadline**, sometimes just a matter of days, so speed matters here more than almost anywhere else.",
          "If your injury also keeps you from working long-term, you may be able to pursue SSDI at the same time, though the two benefits can sometimes offset each other, so it's worth understanding how they interact.",
        ],
      },
      {
        type: "p",
        text: "A common and understandable mistake is waiting too long to report a workplace injury, either out of fear of losing a job or simply not realizing how serious it was at first. If you were hurt at work, even if you're unsure how serious it is, reporting it and getting evaluated right away is almost always the safer path.",
      },
      {
        type: "p",
        text: "An attorney familiar with workers' comp can help you move quickly through these early deadlines, which often makes the biggest difference in how smoothly the rest of the claim goes.",
      },
    ],
  },
  {
    slug: "can-i-get-more-than-one-benefit",
    number: "19",
    category: "Multiple benefits",
    title: "Can I Get More Than One Type of Benefit at the Same Time?",
    description: "Which disability benefits stack, which ones offset each other, and why it is worth asking rather than guessing.",
    pattern: "dots",
    blocks: [
      {
        type: "p",
        text: "Yes, in many situations you can, and understanding how these programs interact can genuinely change your financial picture for the better, so it's worth learning.",
      },
      {
        type: "p",
        text: "Here are some common combinations:",
      },
      {
        type: "ul",
        items: [
          "**SSDI + Medicare**, once your waiting period is complete.",
          "**SSI + Medicaid**, often starting close to your approval date.",
          "**SSDI + SSI** together, if your SSDI payment is low enough to still qualify for extra SSI support.",
          "**VA disability + SSDI**, since these are entirely separate systems.",
          "**Workers' comp + SSDI**, though this combination sometimes involves an “offset,” meaning your SSDI payment may be adjusted so the combined total doesn't exceed a certain limit.",
        ],
      },
      {
        type: "p",
        text: "This is genuinely one of the more confusing parts of the entire system, even for people who've been through it before. The safest approach is simple: ask directly whether the specific benefits you're receiving, or applying for, affect each other, rather than guessing.",
      },
      {
        type: "p",
        text: "An attorney who handles multiple benefit types can map out how everything fits together for your specific situation, which often uncovers income you didn't realize you were entitled to.",
      },
    ],
  },
  {
    slug: "what-can-i-do-to-help-my-case",
    number: "20",
    category: "Take control",
    title: "What Can I Actually Do to Help My Own Case?",
    description: "Five things within your control, starting today, that genuinely strengthen a disability claim.",
    pattern: "grid",
    blocks: [
      {
        type: "p",
        text: "It's completely natural to feel like this entire process is happening to you, rather than something you have any control over. The truth is, there are real, simple things within your control, starting today, that genuinely help.",
      },
      {
        type: "p",
        text: "Here's a simple checklist to start with:",
      },
      {
        type: "ul",
        items: [
          "**Keep every medical appointment you can**, even when it's hard. Consistent treatment is some of the strongest evidence there is.",
          "**Write things down.** A simple daily note about pain levels, bad days, or new symptoms becomes powerful evidence later.",
          "**Answer forms honestly and specifically**, taking your time rather than rushing through them.",
          "**Open every letter immediately**, and note any deadlines on a calendar the same day.",
          "**Ask for some legal help early**, rather than waiting until you're overwhelmed or a deadline is close.",
        ],
      },
      {
        type: "p",
        text: "You didn't choose to be in this situation, so you shouldn't have to face it alone. Every honest, consistent step you take, starting right now, genuinely moves your case forward.",
      },
      {
        type: "p",
        text: "This process can feel slow and impersonal, but your story matters, your evidence matters, and with patience and the right legal support behind you, most determined claimants do eventually get the answer they've been fighting for.",
      },
    ],
  },
];

/** Lookup used by the article route. */
export function getPost(slug: string | undefined): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
