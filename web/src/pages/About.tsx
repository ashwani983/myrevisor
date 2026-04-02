export function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About MyRevisor
        </h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            MyRevisor is an AI-powered DevOps interview preparation tool
            designed to help you ace your interviews.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our application provides interactive study sessions, practice
            quizzes, and an AI chatbot to help you master DevOps concepts.
          </p>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
            Features
          </h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Subject-based study materials</li>
            <li>Interactive quizzes</li>
            <li>AI-powered chatbot for interview questions</li>
            <li>Progress tracking</li>
            <li>Offline support</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mt-6">Version 2.0</p>
        </div>
      </div>
    </div>
  );
}
