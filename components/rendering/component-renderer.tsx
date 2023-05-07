import {
  ComponentHeroBanner,
  PageCollection,
  PageCollectionItem,
  SignUpBox,
} from "@/types/page.type";
import HeroBanner from "../hero/hero-banner";
import ComponentWrapper from "../wrappers/component-wrapper";
import SignupBox from "../forms/sign-up/sign-up-box";
import DuplexComponent from "../duplex/duplex-component";
import TextBlockComponent from "../text-block/text-block";
import { TextBlock } from "@/types/text-block.type";

interface Props {
  itemsToRender: PageCollectionItem["topSectionCollection"]["items"];
}

const ComponentRenderer = ({ itemsToRender }: Props) => {
  if (!itemsToRender) return null;
  return (
    <>
      {itemsToRender.map((component) => {
        if (component.__typename === "ComponentHeroBanner") {
          return (
            <ComponentWrapper key={component.sys.id}>
              <HeroBanner hero={component as ComponentHeroBanner} />
            </ComponentWrapper>
          );
        }

        if (component.__typename === "SignUpBox") {
          return (
            <ComponentWrapper key={component.sys.id} fullWidth={true}>
              <SignupBox signupBox={component as SignUpBox} />
            </ComponentWrapper>
          );
        }

        if (component.__typename === "ComponentDuplex") {
          /* @ts-expect-error Async Server Component */
          return <DuplexComponent key={component.sys.id} data={component} />;
        }
        if (component.__typename === "ComponentTextBlock") {
          return (
            <TextBlockComponent
              key={component.sys.id}
              textBlock={component as TextBlock}
            />
          );
        }
        console.log("Component not found", component);
      })}
    </>
  );
};

export default ComponentRenderer;
