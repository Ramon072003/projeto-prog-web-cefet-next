import { render } from "@testing-library/react";
import TitleSection from "@/components/title-section/titleSection";

describe("TitleSection Component", () => {
  it("should render title section with children", () => {
    const { container } = render(<TitleSection>Test Title</TitleSection>);
    expect(container).toBeTruthy();
  });
});
