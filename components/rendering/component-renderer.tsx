import HeroBanner from '../hero/hero-banner';
import ComponentWrapper from '../wrappers/component-wrapper';
import SignupBox from '../forms/sign-up/sign-up-box';
import DuplexComponent from '../duplex/duplex-component';
import TextBlockComponent from '../text-block/text-block';
import InfoBlockComponent from '../info-block/info-block';
import CtaComponent from '../cta-component/cta-component';
import BusinessInfoTopic from '../business-info/business-info-topic';
import ProductTable from '../product/product-table';
import ContactForm from '../forms/contact/contact-form';
import FAQ from '../faq/FAQ';
import { PossibleComponentType } from '@/types/page.type';

type Props = {
  itemsToRender: PossibleComponentType[];
};

const ComponentRenderer = ({ itemsToRender }: Props) => {
  if (!itemsToRender) return null;
  return (
    <>
      {itemsToRender.map((component) => {
        if (!component?.sys?.id) return null;

        if (component.__typename === 'ComponentHeroBanner') {
          return (
            <ComponentWrapper key={component.sys.id}>
              <HeroBanner {...component} />
            </ComponentWrapper>
          );
        }

        if (component.__typename === 'SignUpBox') {
          return (
            <ComponentWrapper key={component.sys.id} fullWidth={true}>
              <SignupBox {...component} />
            </ComponentWrapper>
          );
        }
        if (component.__typename === 'ComponentDuplex') {
          return <DuplexComponent key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'ComponentTextBlock') {
          return <TextBlockComponent key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'ComponentInfoBlock') {
          return <InfoBlockComponent key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'ComponentCta') {
          return <CtaComponent key={component.sys.id} id={component.sys.id} />;
        }
        if (component.__typename === 'TopicBusinessInfo') {
          return <BusinessInfoTopic key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'ComponentProductTable') {
          return <ProductTable key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'Form') {
          return <ContactForm key={component.sys.id} {...component} />;
        }
        if (component.__typename === 'Faq') {
          return <FAQ key={component.sys.id} {...component} />;
        }
        console.log('Component not found', component);
      })}
    </>
  );
};

export default ComponentRenderer;
