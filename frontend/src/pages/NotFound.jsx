const notFoundImg = '/assets/images/404-suitcase.jpg';

export default function NotFound() {
  return (
    <div className="p-4 max-w-screen-xl mx-auto text-center space-y-4">
      <img src={notFoundImg} alt="404" className="mx-auto w-2/3 max-w-xs" />
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
    </div>
  );
}
