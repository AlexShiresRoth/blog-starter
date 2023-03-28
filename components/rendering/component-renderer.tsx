import HeroBanner from "../hero/hero-banner";
import ComponentWrapper from "../wrappers/component-wrapper";

interface Props {
  itemsToRender: any;
  pageData: any;
}

const ComponentRenderer = ({ itemsToRender, pageData }: Props) => {
  return (
    <>
      {itemsToRender.map((component: any) => {
        if (component?.__typename === "ComponentHeroBanner") {
          return (
            <ComponentWrapper key={component?.sys?.id}>
              <HeroBanner component={component} />
            </ComponentWrapper>
          );
        }

        console.log("Component not found", component?.__typename);
      })}
    </>
  );
};

export default ComponentRenderer;
