# Nemo: Your AI Co-Pilot

Build an Entire Production-Quality AI Productivity Platform Called Nemo

You are an expert Senior UI/UX Designer, Senior Full Stack Engineer, AI Engineer, Prompt Engineer, Product Designer and Software Architect.

**Do NOT build a prototype. **USE index.html that is attached as a style reference on the layouts. **

Build a polished, portfolio-quality, production-style AI web application called Nemo that looks like a real commercial SaaS product.

The project must satisfy every requirement below.

Project Name

Nemo

Tagline

Work Smarter. Let Nemo Handle the Rest.

Project Goal

Create ONE integrated AI Productivity Platform that combines multiple workplace AI tools inside one dashboard.

This is NOT multiple projects.

Everything must exist inside one application.

Primary Objective

Implement AI in a practical workplace productivity solution.

Every AI tool must be fully functional using real AI.

Use modern prompt engineering.

Solve real workplace problems.

Use AI responsibly.

Create an outstanding user experience.

Tech Stack

Use:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Framer Motion

Lucide Icons

Recharts

OpenAI API

Responsive Design

Use clean architecture.

API Security

The OpenAI API key MUST NEVER appear in frontend code.

Store it securely inside:

.env

The .env file MUST be ignored inside

.gitignore

Never expose API keys.

Never hardcode secrets.

Required AI Features

All of these MUST work.

1 Smart Email Generator

Users can enter:

recipient

company

context

purpose

tone

Supported tones:

Formal

Friendly

Persuasive

Generate professional emails.

Allow:

Copy

Regenerate

Download

2 Meeting Notes Summarizer

User pastes meeting notes.

AI must generate

Executive Summary

Key Decisions

Action Items

Responsibilities

Deadlines

Bullet Summary

Copy button

3 AI Task Planner

Generate

Daily Schedule

Weekly Schedule

Prioritise tasks.

Categorise by

Urgent

Important

Low Priority

Suggest productivity improvements.

4 AI Research Assistant

User enters

topic

article

report

website text

Generate

Summary

Insights

Recommendations

Advantages

Disadvantages

Key Takeaways

5 AI Workplace Chatbot

Interactive chatbot.

Conversation history.

Streaming responses.

Typing animation.

Suggested prompts.

Quick actions.

Looks similar to ChatGPT.

Nemo AI Workspace

Everything exists inside one dashboard.

Dashboard Layout

Modern SaaS Dashboard.

Layout:

Sidebar

Top Navigation

Main Workspace

Widgets

Cards

Footer

Sidebar

Professional vertical sidebar.

Contains

🏠 Dashboard

📧 Smart Email

📝 Meeting Notes

📅 Task Planner

🔍 Research

🤖 AI Assistant

📊 Analytics

⚙ Settings

❓ Help

Collapse animation.

Hover animation.

Mobile drawer.

Top Navigation

Contains

Search bar

Notifications

Dark Mode

User avatar

Settings

Dashboard Home

Welcome section

Greeting

Quick Actions

Recent Activity

Productivity cards

Today's Focus

Recent AI Requests

Recent Documents

Recent Summaries

Pinned Tasks

Dashboard Widgets

Beautiful glass cards.

Examples

AI Requests

Tasks Completed

Efficiency

Response Time

Today's Sessions

Saved Documents

Upcoming Tasks

Current AI Status

Analytics Section

Professional analytics cards.

NO large heavy graphs.

Instead use:

Small sparkline charts

Tiny bar charts

Circular progress indicators

Mini activity timeline

Weekly usage card

Monthly productivity card

Average response time

AI usage today

Everything lightweight.

Live AI Status Card

Animated status.

Examples

🟢 AI Ready

🟢 Summarising Notes

🟢 Drafting Email

🟢 Researching

🟢 Planning Tasks

Animated pulse indicator.

Nemo AI Applications

Applications appear as beautiful cards.

NOT plain buttons.

Each card includes

small illustration

icon

title

description

hover glow

arrow

Examples

📧 Smart Emails

📅 Schedule Planner

🤖 AI Assistant

📝 Meeting Notes

🔍 Research

📊 Productivity

Home Page

Hero Layout

Left side

Hero content

Right side

Applications list

Modern glass layout.

Hero Title

Work Smarter.
Let Nemo Handle the Rest.

Subtitle

Intelligent AI for Modern Businesses.

Description

Nemo helps professionals streamline everyday work by generating emails, summarising meetings, planning schedules, researching information, and providing an intelligent AI assistant—all from one workspace.

Buttons

Launch Dashboard

Learn More

Homepage Applications Panel

Instead of feature cards at the bottom,

display a vertical application selector.

Professional SaaS appearance.

Each application is selectable.

Each opens its own workspace.

AI Tool Pages

Every AI tool has its own page.

Example

/email

/meeting

/research

/tasks

/chat

Each page has

Input section

Output section

Example prompts

AI Response card

Copy button

Regenerate button

Loading animation

User Experience

Everything should feel premium.

Examples

Hover effects

Animated cards

Smooth transitions

Loading shimmer

Floating buttons

Soft shadows

Rounded corners

Glassmorphism

Micro interactions

Scroll reveal animations

Responsive Design

Perfect on

Desktop

Tablet

Mobile

Sidebar becomes drawer.

Cards stack properly.

Inputs resize.

Navigation responsive.

Professional UI Style

Modern SaaS.

Inspired by

OpenAI

Notion AI

Microsoft Copilot

Linear

Vercel

Perplexity

Cursor

Claude

Colour Palette

Primary

Deep Ocean Blue

#021B3A

Secondary

Bright Aqua

#4FDFFF

Accent

#3FD2FF

Background

Dark Navy

Text

White

Soft Blue

Borders

Glass White

Glassmorphism

Heavy use of

blur

transparent cards

soft borders

rounded corners

floating panels

Background Design (Must Match Existing Nemo Theme)

The background is a major design feature and must be implemented exactly.

Create a layered animated scene inspired by the ocean and AI.

Include:

A Three.js animated particle system with approximately 1800–2500 glowing particles.

Floating AI nodes connected with subtle glowing lines to resemble a neural network.

Gentle mouse parallax movement so the background reacts slightly to cursor movement.

Slow rotation and floating motion of particles for a calm effect.

A fixed dark gradient overlay to improve readability.

Animated ocean waves at the bottom of the page using layered CSS animations.

Three wave layers moving at different speeds for a realistic parallax effect.

A faint business city skyline silhouette positioned above the waves.

Soft glowing ambient lighting.

Glass reflections on cards.

The background must remain lightweight and performant without causing lag.

The overall atmosphere should feel like:

Ocean technology

Artificial intelligence

Innovation

Premium enterprise software

Avoid clutter and excessive animation.

Required CSS Design Language

Implement the styling using the same visual language throughout the entire application.

Include:

Poppins font

Smooth scrolling

Full CSS reset

Responsive design

Glassmorphism cards

Animated gradient buttons

Neon aqua hover effects

Floating animations

Animated logo

Soft shadows

Border glow on hover

Rounded corners (20px–30px)

Blur backgrounds

Glass navbar

Responsive grid layouts

Card lift animations

Button shine animation

Pulse animations

Wave animations

Hover icon scaling

Professional spacing

Consistent typography hierarchy

Dark ocean theme

Dashboard widgets styled as glass cards

Modern SaaS layout

Sidebar transitions

Animated activity indicators

Compact analytics cards

Mobile-friendly breakpoints

Smooth page transitions

Clean scrollbar styling

Accessible colour contrast

Prompt Engineering

Each AI tool must use carefully engineered prompts.

Do NOT simply send the user input.

Create structured prompts.

Example

Role

Goal

Context

Tone

Output Format

Constraints

Quality checks

Responsible AI

Include a Responsible AI section.

State that

AI can make mistakes.

Always verify important information.

Never rely solely on AI for

Legal

Financial

Medical

Business decisions.

Settings Page

Allow

Theme switching

Profile

Notification preferences

API connection status

Help Page

Explain

Each AI tool

How to use it

Best prompts

Privacy

Responsible AI

Footer

Contains

Nemo

GitHub

LinkedIn

Email

Copyright

Performance

Optimise everything.

Lazy loading.

Fast rendering.

No lag.

Efficient animations.

Small charts.

Minimal re-renders.

Accessibility

Keyboard navigation

ARIA labels

Semantic HTML

Proper contrast

Screen reader support

Code Quality

Component based.

Reusable.

Well organised folders.

Readable.

Comments where appropriate.

Consistent naming.

Final Deliverable

Deliver a complete, polished, production-quality AI Productivity Platform called Nemo with:

A modern dashboard

Fully functional AI tools

Secure API integration using .env

API keys excluded via .gitignore

Responsive desktop and mobile layouts

Premium SaaS UI/UX

Ocean-inspired animated Three.js background

Glassmorphism styling

Sidebar navigation

Individual AI tool pages

Responsible AI practices

Real AI functionality

Strong prompt engineering

Clean architecture

Portfolio-quality presentation suitable for university assessment and showcasing to employers.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e79f772a-7984-4cf8-9727-8b81b9aa177f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
