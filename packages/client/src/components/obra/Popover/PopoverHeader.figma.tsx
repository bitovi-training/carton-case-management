import { PopoverHeader } from "./PopoverHeader";
import figma from "@figma/code-connect";

figma.connect(
  PopoverHeader,
  "https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=2336-181",
  {
    props: {
      title: figma.textContent("2336:147"),
      description: figma.textContent("2336:148"),
    },
    example: ({ title, description }) => (
      <PopoverHeader 
        title={title} 
        description={description}
      />
    ),
  }
);