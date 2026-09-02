import { Link, useLocation } from "react-router-dom";

const pageContent = {
  "/services": ["Our Services", "Shop confidently with product discovery, saved wishlists, a simple cart, and customer support.", ["Browse by category or search for products.", "Save favourites to your wishlist and review your cart before checkout.", "Use our contact page for product, delivery, or order questions."]],
  "/how-to-shop": ["How to Shop", "Shopping with ShopSphere is straightforward.", ["Browse products or use the search and category filters.", "Open a product to review details, images, ratings, and availability.", "Add items to your cart, adjust quantities, and proceed to checkout."]],
  "/payment-methods": ["Payment Methods", "Payment options are presented securely during checkout.", ["Review the final order total before confirming payment.", "Never share card or account details through support messages.", "Contact support if a payment attempt is duplicated or declined."]],
  "/money-back-guarantee": ["Money-back Guarantee", "If an eligible item is not right for you, contact support with your order details.", ["Keep the item and order information until your request is resolved.", "Eligibility depends on the item condition and return window.", "Approved refunds are sent to the original payment method."]],
  "/returns": ["Returns", "Start a return request from support and include your order reference.", ["Tell us the item, issue, and preferred resolution.", "Return items unused and in their original condition where possible.", "We will share the next steps after reviewing the request."]],
  "/shipping": ["Shipping", "Delivery estimates and available options are shown during checkout.", ["Shipping times vary by product and destination.", "Check your delivery details carefully before placing an order.", "Use Track My Order for the latest order-status guidance."]],
  "/terms": ["Terms and Conditions", "By using ShopSphere, you agree to use the service lawfully and provide accurate order information.", ["Product availability and prices may change before an order is confirmed.", "Orders may be cancelled when payment or stock verification fails.", "For questions about these terms, contact ShopSphere support."]],
  "/privacy": ["Privacy Policy", "We use the information needed to operate the store, process requests, and provide support.", ["Do not share passwords or payment details in support messages.", "We only use contact information to respond to your request or order.", "Contact us if you have a question about your information."]],
  "/track-order": ["Track My Order", "Order tracking will be available after an order is confirmed and dispatched.", ["Keep your order confirmation reference.", "Check the delivery updates provided with your order.", "If an update is missing, contact support with the order reference."]],
  "/help": ["Help Centre", "Need help? Start with our FAQs or contact our support team.", ["Read answers to common delivery, order, and return questions.", "Use the contact form for specific support requests.", "Call our support line for urgent assistance."]],
};

const InfoPage = () => {
  const [title, intro, items] = pageContent[useLocation().pathname] || ["Information", "The requested page is not available.", []];
  return <main className="max-w-4xl mx-auto px-6 py-10"><p className="text-sm text-gray-500"><Link className="hover:underline" to="/">Home</Link> / {title}</p><h1 className="mt-4 text-3xl font-bold">{title}</h1><p className="mt-4 text-gray-700">{intro}</p><ul className="mt-6 space-y-3 list-disc pl-5 text-gray-700">{items.map((item) => <li key={item}>{item}</li>)}</ul><Link className="inline-block mt-8 text-[#F7569B] font-semibold hover:underline" to="/contact">Contact ShopSphere Support</Link></main>;
};

export default InfoPage;
