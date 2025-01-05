import BookButton from './ui/BookButton';

export default function BookingSection() {
  return (
    <section className="px-6 py-12 text-center md:px-16 lg:px-24">
      <h2 className="mb-4 text-3xl font-bold">Ready to Look and Feel Your Best?</h2>
      <p className="mb-6 text-lg">
        Book an appointment with us today and treat yourself to our luxury beauty services.
      </p>
      <BookButton />
    </section>
  );
}
