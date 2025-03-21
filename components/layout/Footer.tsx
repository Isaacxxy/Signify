const Footer = () => {
  const sections = [
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      title: "Products",
      links: ["Features", "Pricing", "Updates"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Support", "Knowledge Base", "FAQ"],
    },
    {
      title: "Company",
      links: ["About Us", "Our Story", "Leadership"],
    },
    {
      title: "Careers",
      links: ["Job Openings", "Internships", "Culture"],
    },
    {
      title: "Social",
      links: ["Follow Us", "Blog", "Community"],
    },
  ];

  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-6 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-gray-400">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
