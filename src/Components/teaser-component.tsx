import styled from "styled-components";
import { LearnMoreButton } from "./learn-more-button";
import { useEffect, useRef, useState } from "react";

const TeaserWrapper = styled.section`
  margin-top: 120px;
`;

const TeaserComponentWrapper = styled.section`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  margin: -16px;
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 64px 80px;
  border-radius: 16px;
  min-height: 552px;
  flex: 0 0 50%;
  z-index: 1;

  &:before {
    background-color: white;
    inset: 0 16px;
    border-radius: 16px;
    content: "";
    box-shadow: 0 14px 18px rgba(0, 0, 0, 0.06);
    position: absolute;
    z-index: -1;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h3`
  line-height: 32px;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 26px;
  margin-bottom: 232px;
`;

const ImageWrapper = styled.div`
  width: 640px;
  height: 512px;
  position: relative;
  padding-inline: 16px;
  margin-left: unset;
  margin-top: 80px;
  left: auto;
  flex: 0 0 58.3333333333%;
  min-width: 58.3333333333%;
`;

const Picture = styled.picture`
  width: 640px;
  height: 512px;
  overflow: hidden;
  border-radius: 16px;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const Image = styled.img`
  transition: opacity 0.1s ease-in-out;
  &.scrolled {
    opacity: 1;
  }
  &.unscrolled {
    opacity: 0;
  }
`;

export const TeaserCompnent = ({
  onRight,
  url,
  title,
  description,
}: {
  onRight: boolean;
  url: string;
  title: string;
  description: string;
}) => {
  const [firstScrolled, setFirstScrolled] = useState(false);
  const [secondScrolled, setSecondScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 300) {
      setFirstScrolled(true);
    }
    if (window.scrollY >= 1000) {
      setSecondScrolled(true);
    }
    if (secondScrolled === true) {
      window.removeEventListener("scroll", handleScroll);
    }
  };
  return (
    <TeaserWrapper>
      <TeaserComponentWrapper>
        {onRight ? (
          <>
            <ContentWrapper>
              <Content>
                <Title>{title}</Title>
                <Description>{description}</Description>
              </Content>

              <LearnMoreButton string="자세히 보기" />
            </ContentWrapper>
            <ImageWrapper style={{ right: `8.3333333333%` }}>
              <Picture>
                <Image
                  className={firstScrolled ? "scrolled" : "unscrolled"}
                  onScroll={handleScroll}
                  src={url}
                  width="1280"
                  height="1024"
                />
              </Picture>
            </ImageWrapper>
          </>
        ) : (
          <>
            <ImageWrapper>
              <Picture>
                <Image
                  className={secondScrolled ? "scrolled" : "unscrolled"}
                  onScroll={handleScroll}
                  src={url}
                  width="1280"
                  height="1024"
                />
              </Picture>
            </ImageWrapper>
            <ContentWrapper style={{ right: `8.3333333333%` }}>
              <Content>
                <Title>{title}</Title>
                <Description>{description}</Description>
              </Content>

              <LearnMoreButton string="자세히 보기" />
            </ContentWrapper>
          </>
        )}
      </TeaserComponentWrapper>
    </TeaserWrapper>
  );
};
