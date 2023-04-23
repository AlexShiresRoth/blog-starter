import {
  ComponentHeroBanner,
  PageCollection,
  PageCollectionItem,
  PageJSON,
  SignUpBox,
} from "@/types/page.type";
import HeroBanner from "../hero/hero-banner";
import ComponentWrapper from "../wrappers/component-wrapper";
import SignupBox from "../forms/sign-up/sign-up-box";

interface Props {
  itemsToRender: PageCollectionItem["topSectionCollection"]["items"];
  pageData: PageCollection["items"][number];
}

const ComponentRenderer = ({ itemsToRender, pageData }: Props) => {
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

        console.log("Component not found", component);
      })}
    </>
  );
};

export default ComponentRenderer;
