export const Footer = () => {
  return (
    <footer className="dark:bg-darkBlue bg-white p-4 md:p-6 flex items-center w-full justify-center text-center text-xs leading-tight shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1)] transition-colors">
      <p>
        {new Date().getFullYear()} - Created by{' '}
        <a
          target="_blank"
          href="https://www.github.com/BrunoZielinski"
          rel="noopener noreferrer nofollow external"
          className="hover:underline hover:text-blue-500"
        >
          Bruno Zielinski
        </a>{' '}
        -{' '}
        <a
          target="_blank"
          href="https://www.frontendmentor.io"
          rel="noopener noreferrer nofollow external"
          className="hover:underline hover:text-blue-500"
        >
          Frontend Mentor Challenge
        </a>
      </p>
    </footer>
  )
}
