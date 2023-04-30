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

interface Props {
  itemsToRender: PageCollectionItem["topSectionCollection"]["items"];
  pageData: PageCollection["items"][number];
}

const ComponentRenderer = ({ itemsToRender, pageData }: Props) => {
  if (!itemsToRender) return null;
  console.log("items to render", itemsToRender);
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
            <ComponentWrapper key={component.sys.id} fullWidth={false}>
              <SignupBox signupBox={component as SignUpBox} />
            </ComponentWrapper>
          );
        }

        if (component.__typename === "ComponentDuplex") {
          return <DuplexComponent key={component.sys.id} data={component} />;
        }
        console.log("Component not found", component);
      })}
    </>
  );
};

export default ComponentRenderer;
