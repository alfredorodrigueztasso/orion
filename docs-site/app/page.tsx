import { getRegistryMetadata } from '@/lib/registry';
import ComponentShowcaseTabs from '@/components/ComponentShowcaseTabs';
import HomepageHero from '@/components/HomepageHero';
import HomepageInstall from '@/components/HomepageInstall';
import HomepageLogoCloud from '@/components/HomepageLogoCloud';
import HomepageFeaturesSection from '@/components/HomepageFeaturesSection';
import HomepageTestimonials from '@/components/HomepageTestimonials';
import HomepageStats from '@/components/HomepageStats';
import HomepageCTA from '@/components/HomepageCTA';

export default async function HomePage() {
  const metadata = getRegistryMetadata();

  return (
    <>
      <HomepageHero
        componentCount={metadata.componentCount}
        sectionCount={metadata.sectionCount}
        templateCount={metadata.templateCount}
      />

      <HomepageInstall />

      <HomepageLogoCloud />

      {/* Component Showcase - Main Visual Section */}
      <section
        style={{
          padding: '0 var(--spacing-8)',
          maxWidth: '1400px',
          margin: '0 auto',
          marginTop: 'var(--spacing-16)',
          marginBottom: 'var(--spacing-16)',
        }}
      >
        <ComponentShowcaseTabs />
      </section>

      <HomepageFeaturesSection
        componentCount={metadata.componentCount}
        sectionCount={metadata.sectionCount}
      />

      <HomepageTestimonials />

      <HomepageStats
        counts={{
          components: metadata.componentCount,
          sections: metadata.sectionCount,
          templates: metadata.templateCount,
        }}
      />

      <HomepageCTA />
    </>
  );
}
