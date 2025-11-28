<h1 align="center">AI Resume Analyzer + Job Match Predictor</h1>

<p align="center">
  A web app that analyzes resumes, compares them with job descriptions, and gives smart, AI-powered suggestions.
</p>

<p align="center">
  🔗 <strong>Live Demo:</strong>
  <a href="https://resume-checker007.netlify.app" target="_blank">
    https://resume-checker007.netlify.app
  </a>
</p>

<hr/>

<h2>🚀 Project Overview</h2>
<p>
This project is an AI-powered Resume Analyzer and Job Match Predictor.  
Users can upload a resume or paste the content, paste a job description, and get:
</p>
<ul>
  <li>Overall resume quality score</li>
  <li>Job match score (0–100%)</li>
  <li>Matched skills between resume and JD</li>
  <li>Missing / recommended skills</li>
  <li>Suggestions to improve the resume for that job</li>
  <li>History of previous analyses</li>
</ul>

<h2>✨ Features</h2>
<ul>
  <li>Upload or paste resume text</li>
  <li>Paste job description for comparison</li>
  <li>AI-based analysis using Gemini API</li>
  <li>Job match score and resume quality insights</li>
  <li>Highlight matched and missing skills</li>
  <li>Actionable suggestions to improve the resume</li>
  <li>Analysis history page (view previous results)</li>
  <li>Responsive, modern UI built with React + Vite</li>
</ul>

<h2>🛠 Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React, TypeScript, Vite</li>
  <li><strong>Styling:</strong> Tailwind CSS / utility classes (as used in the code)</li>
  <li><strong>Icons:</strong> lucide-react</li>
  <li><strong>AI:</strong> Google Gemini API (via API key)</li>
  <li><strong>Deployment:</strong> Netlify</li>
</ul>

<h2>📦 Getting Started (Local Setup)</h2>

<h3>1️⃣ Clone the repository</h3>
<pre><code>git clone &lt;your-repo-url&gt;
cd &lt;your-project-folder&gt;
</code></pre>

<h3>2️⃣ Install dependencies</h3>
<pre><code>npm install
</code></pre>

<h3>3️⃣ Configure environment variables</h3>
<p>Create a <code>.env.local</code> file in the project root:</p>
<pre><code>GEMINI_API_KEY=your_gemini_api_key_here
</code></pre>
<p>
Get your Gemini API key from
<a href="https://ai.google.dev" target="_blank">Google AI Studio</a>.
Do <strong>not</strong> commit this file to GitHub.
</p>

<h3>4️⃣ Run the development server</h3>
<pre><code>npm run dev
</code></pre>
<p>Open the URL shown in the terminal (usually <code>http://localhost:5173</code> or <code>http://localhost:3000</code>).</p>

<h2>🌐 Deployment</h2>
<ul>
  <li>Build the project using <code>npm run build</code></li>
  <li>Deploy the generated <code>dist/</code> folder to Netlify</li>
  <li>Set <code>GEMINI_API_KEY</code> as an environment variable in the Netlify site settings (Environment variables)</li>
</ul>

<p>
Live site:  
<a href="https://resume-checker007.netlify.app" target="_blank">
https://resume-checker007.netlify.app
</a>
</p>

<h2>📸 Screenshots (Optional)</h2>
<p>You can add screenshots here later, for example:</p>
<ul>
  <li>Home / Analyzer page</li>
  <li>Results view with scores</li>
  <li>History page</li>
</ul>

<h2>📌 Future Improvements</h2>
<ul>
  <li>Export analysis as PDF</li>
  <li>User authentication and saved profiles</li>
  <li>Integration with job portals</li>
  <li>Support for multiple resume templates</li>
</ul>

<h2>🙌 Acknowledgements</h2>
<ul>
  <li>Google Gemini API</li>
  <li>React, Vite, and open-source ecosystem</li>
</ul>
