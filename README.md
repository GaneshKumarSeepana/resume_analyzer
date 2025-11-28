<h1>ResuMatch AI – AI Resume Analyzer &amp; Job Match Predictor</h1>

<p>
  An AI-powered web app that helps users analyze their resume against a specific job description
  and get a clear job match score, matched/missing skills, and personalized suggestions to improve
  their resume.
</p>

<h2>🚀 Live Demo</h2>
<p>
  ▶️ <a href="https://resume-checker007.netlify.app" target="_blank">
    https://resume-checker007.netlify.app
  </a>
</p>

<h2>🎯 What This App Does</h2>
<ul>
  <li>Upload or paste your <strong>resume</strong>.</li>
  <li>Paste a <strong>job description</strong> from any job portal.</li>
  <li>Click <strong>Analyze</strong> to get:
    <ul>
      <li>Overall <strong>Resume Quality Score</strong></li>
      <li><strong>Job Match Score</strong> (0–100%)</li>
      <li><strong>Matched skills</strong> vs <strong>Missing skills</strong></li>
      <li><strong>Recommendations</strong> to improve your resume for that job</li>
      <li>Suggested <strong>alternative job roles</strong> that fit your profile</li>
    </ul>
  </li>
</ul>

<h2>🧩 Frontend Tech Stack</h2>
<ul>
  <li><strong>Framework:</strong> React (Vite-based project)</li>
  <li><strong>Language:</strong> TypeScript</li>
  <li><strong>Bundler / Dev Server:</strong> Vite</li>
  <li><strong>Routing:</strong> React Router</li>
  <li><strong>Charts &amp; Visualization:</strong> Recharts (for score charts &amp; analytics)</li>
  <li><strong>Icons:</strong> lucide-react</li>
  <li><strong>AI Integration (Frontend):</strong>Gemini API</li>
</ul>

<h2>✨ Key Features</h2>
<ul>
  <li><strong>AI-based Resume Parsing</strong> – Extracts skills, experience, and keywords.</li>
  <li><strong>Job Description Matching</strong> – Compares your resume with the job description.</li>
  <li><strong>Visual Scorecard</strong> – Shows job match score using interactive charts.</li>
  <li><strong>Skill Gap Analysis</strong> – Highlights missing skills for the target role.</li>
  <li><strong>Actionable Suggestions</strong> – Gives clear advice to improve your resume.</li>
  <li><strong>History Page</strong> – View previous analyses (if storage is enabled).</li>
</ul>

<h2>📂 Project Structure (Frontend)</h2>
<pre>
/src
  /components      → Reusable UI components (charts, cards, etc.)
  /pages           → Main pages (Analyzer, History)
  /services        → Gemini API &amp; storage helpers
  App.tsx          → App layout &amp; routing
  index.tsx        → Entry point
</pre>

<h2>🔧 How to Run Locally</h2>
<ol>
  <li>Clone the repository:
    <pre><code>git clone &lt;your-repo-link&gt;
cd &lt;your-repo-folder&gt;</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Create a <code>.env.local</code> file in the root and add your Gemini API key:
    <pre><code>GEMINI_API_KEY=your_api_key_here</code></pre>
  </li>
  <li>Run the development server:
    <pre><code>npm run dev</code></pre>
  </li>
  <li>Open the local URL shown in the terminal in your browser.</li>
</ol>

<h2>📌 Future Improvements</h2>
<ul>
  <li>Export analysis as PDF.</li>
  <li>More detailed resume section-wise feedback.</li>
  <li>User authentication and saved analysis history per user.</li>
</ul>

<h2>🙌 Credits</h2>
<p>
  Designed &amp; developed by <strong>&lt;Ganesh&gt;</strong> using React, TypeScript, Vite.
</p>
