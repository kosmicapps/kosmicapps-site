import Section from '@/components/Section';
import PrimaryCTA from '@/components/PrimaryCTA';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Section className="text-center py-20">
        <div className="max-w-2xl mx-auto">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo to-pink rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-gray-800 text-6xl">🚀</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-deep-space mb-6">
            Lost in space
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            That page drifted beyond our orbit.
          </p>

          <PrimaryCTA href="/">
            Back to home
          </PrimaryCTA>
        </div>
      </Section>
    </div>
  );
}
