export function Copyright() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Copyright
        </h1>
        <div className="prose dark:prose-invert max-w-none space-y-4 text-gray-600 dark:text-gray-300">
          <p>© 2026 MyRevisor. All rights reserved.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Developer
          </h2>
          <p>
            Developed by{' '}
            <a
              href="https://github.com/ashwani983"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline"
            >
              ashwani983
            </a>
          </p>
          <p>
            NPM:{' '}
            <a
              href="https://www.npmjs.com/~ashwanig983"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:underline"
            >
              @ashwanig983
            </a>
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Content Rights
          </h2>
          <p>
            All study materials, questions, and content provided in this
            application are for educational purposes.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Software License
          </h2>
          <p>This software is provided "as is" without warranty of any kind.</p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Third-Party Libraries
          </h2>
          <p>
            This application uses open-source libraries. Their respective
            licenses apply.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Contact
          </h2>
          <p>
            For copyright inquiries, please contact us through our GitHub
            repository.
          </p>
        </div>
      </div>
    </div>
  );
}
