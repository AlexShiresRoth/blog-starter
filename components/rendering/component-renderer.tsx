import HeroBanner from '../hero/hero-banner';
import ComponentWrapper from '../wrappers/component-wrapper';
import SignupBox from '../forms/sign-up/sign-up-box';
import DuplexComponent from '../duplex/duplex-component';
import TextBlockComponent from '../text-block/text-block';
import InfoBlockComponent from '../info-block/info-block';
import CtaComponent from '../cta-component/cta-component';
import ProductTable from '../product/product-table';
import ContactForm from '../forms/contact/contact-form';
import FAQ from '../faq/FAQ';
import { PossibleComponentType } from '@/types/page.type';
import BlogFeatured from '../blog/blog-featured';
import MorePosts from '../blog/more-posts';

type Props = {
  itemsToRender: PossibleComponentType[];
};

const ComponentRenderer = ({ itemsToRender }: Props) => {
  if (!itemsToRender) return null;
  return (
    <>
      {itemsToRender.map((component) => {
        if (!component?.sys?.id) {
          console.error('Component is missing sys.id', component);
          return null;
        }
        if (component.__typename === 'ComponentHeroBanner') {
          return <HeroBanner {...component} key={component.sys.id} />;
        }
        if (component.__typename === 'FeaturedPostsSection') {
          return <BlogFeatured key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'MorePostsSection') {
          return <MorePosts key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'SignUpBox') {
          return (
            <ComponentWrapper key={component.sys.id} fullWidth={true}>
              <SignupBox {...component} />
            </ComponentWrapper>
          );
        }
        console.log('Component not found', component);
      })}
    </>
  );
};

export default ComponentRenderer;
