export const ContactUsPage = () => {
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Contact Us
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 text-center">
          We'd love to hear from you! Reach out to our team for any inquiries or
          support.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Developed by NexGen Club
            </h3>
            <p className="text-gray-700">
              <strong>Developer:</strong> Manish Kumar
            </p>
            <p className="text-gray-700">
              <strong>Developer Email:</strong>{" "}
              <a
                href="mailto:manishkushwaha2525@gmail.com"
                className="text-blue-600 hover:underline"
              >
                manishkushwaha2525@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Club Leadership
            </h3>
            <p className="text-gray-700">
              <strong>Club Coordinator:</strong> Sidharod Mahagao
            </p>
            <p className="text-gray-700">
              <strong>Club Manager:</strong> Utsav Lankapati
            </p>
            <p className="text-gray-700">
              <strong>Club Tech Lead:</strong> Manish Kushwaha
            </p>
          </div>
        </div>

        <p className="text-md text-gray-600 mt-8 text-center">
          For general inquiries, please use the provided email.
        </p>
      </div>
    </section>
  );
};
