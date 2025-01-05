import beautySalon from '@/assets/images/beauty-salon.jpeg';

export default function BeautyExperienceSection() {
  return (
    <section className="flex flex-col items-center bg-pink-100 px-6 py-12 md:px-16 lg:flex-row lg:justify-between lg:px-24">
      <div className="text-center lg:w-1/2 lg:pr-12 lg:text-left">
        <h2 className="mb-4 text-3xl font-bold">
          Discover Our Premium Salon Services
        </h2>
        <p className="mb-6 text-gray-600">
          From luxurious facials to relaxing massages, our salon offers a wide
          range of services tailored to meet your individual beauty needs.
          Whether you&apos;re looking for a relaxing spa experience or a fresh
          new look, our professional team is here to provide the highest level
          of care.
        </p>
      </div>
      <img
        src={beautySalon}
        alt="Beauty salon interior"
        className="mt-8 w-full rounded-md shadow-md lg:ml-12 lg:mt-0 lg:w-1/2"
      />
    </section>
  );
}
