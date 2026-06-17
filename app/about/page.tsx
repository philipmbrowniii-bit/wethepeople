import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="font-serif text-5xl font-bold">About We The People</h1>
        <div className="mt-8 space-y-5 text-lg leading-8">
          <p>
            We The People publishes transparent civic reform op-eds for readers who want serious arguments without
            clutter, ads, subscriptions, or paywalls.
          </p>
          <p>
            Every article is opinion writing. The site is not a straight news desk and does not present its essays as
            neutral reporting. Authors are expected to make their reasoning plain, name assumptions, and write in good
            faith.
          </p>
          <p>
            The platform is free to read. Its purpose is to make civic reform arguments easier to find, consider, and
            discuss.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
