'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { monExpertise, maFormation } from './constants';

// Styles
const Container = styled.div`
  max-width: 1100px;
  margin: 50px auto;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: #f4f4f9;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const Section = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 15px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListItem = styled.li`
  font-size: 16px;
  color: #1f2937;
  padding-left: 24px;
  position: relative;
  line-height: 1.6;
  &:before {
    content: '✔';
    position: absolute;
    left: 0;
    font-size: 18px;
    color: #10b981;
  }
`;

const Button = styled(motion.button)`
  background: #2563eb;
  color: white;
  padding: 14px 20px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  align-self: center;
  margin-top: 20px;
  width: fit-content;
  &:hover {
    background: #1e40af;
  }
`;

// Components
const AnimatedSection = ({ children }) => (
  <Section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
    {children}
  </Section>
);

const ListSection = ({ items }) => (
  <List>
    {items.map((item, index) => (
      <ListItem key={index}>{item}</ListItem>
    ))}
  </List>
);

const ModuleSection = ({ modules }) =>
  modules.map((module, index) => (
    <div key={index}>
      <h3>{module.title}</h3>
      <ListSection items={module.content} />
    </div>
  ));

const TrainingBrochure = () => {
  return (
    <Container>
      <AnimatedSection>
        <Title>{maFormation.title}</Title>
        <Subtitle>{maFormation.subtitle}</Subtitle>
        <Title>Objectifs pédagogiques</Title>
        <ListSection items={maFormation.objectives} />
      </AnimatedSection>

      <AnimatedSection>
        <Title>Programme de la formation</Title>
        <ModuleSection modules={maFormation.program} />
      </AnimatedSection>

      <AnimatedSection>
        <Title>Public cible</Title>
        <ListSection items={maFormation.audience} />
        <Title>Informations pratiques</Title>
        {Object.entries(maFormation.details).map(([key, value]) => (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong>{' '}
            {value}
          </p>
        ))}
      </AnimatedSection>

      <AnimatedSection>
        <Title>{monExpertise.title}</Title>
        <Subtitle>{monExpertise.description}</Subtitle>
        <ModuleSection modules={monExpertise.expertise} />
        <Title>Pourquoi choisir cette formation ?</Title>
        <ListSection items={monExpertise.why_choose} />
        <Subtitle>{monExpertise.closing}</Subtitle>
      </AnimatedSection>

      <AnimatedSection>
        <Title>Contact</Title>
        {Object.entries(maFormation.contact).map(([key, value]) => (
          <p key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)} :</strong>{' '}
            {value}
          </p>
        ))}
        <Button whileHover={{ scale: 1.05 }}>{maFormation.cta}</Button>
      </AnimatedSection>
    </Container>
  );
};

export default TrainingBrochure;
