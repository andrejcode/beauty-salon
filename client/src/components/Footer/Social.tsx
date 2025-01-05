import { FacebookIcon, InstagramIcon } from '../SocialIcons';

export default function Social() {
  return (
    <div className="flex-grow">
      <h3 className="text-3xl font-semibold">
        Let&apos;s Create Beauty Together
      </h3>
      <p className="mt-2 text-gray-600">
        Join us in crafting stunning looks that empower and inspire.
      </p>
      <div className="mt-4 flex space-x-4">
        <FacebookIcon />
        <InstagramIcon />
      </div>
    </div>
  );
}
