export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Terms and Conditions
        </h1>
        <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-300">
          <p>Last updated: April 2024</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p>By using MyRevisor, you agree to these terms and conditions.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            2. Use of Service
          </h2>
          <p>
            MyRevisor is provided for educational purposes only. You are
            responsible for maintaining the confidentiality of your API keys.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            3. User Data
          </h2>
          <p>
            All your data is stored locally in your browser. We do not collect
            or store any personal information on external servers.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            4. AI Services
          </h2>
          <p>
            The AI chatbot feature uses third-party APIs (OpenRouter). You must
            provide your own API key to use this feature.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            5. Disclaimer
          </h2>
          <p>
            This tool is for educational purposes only. We do not guarantee
            interview success or accuracy of AI-generated responses.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued
            use constitutes acceptance of modified terms.
          </p>
        </div>
      </div>
    </div>
  );
}
