# Contributing to Seek

The best way to contribute to Seek is to use it. The second best way is to tell your friends about it! But if you want to do even more, here are some other ways to help.

## About this codebase

iNaturalist's code is open source primarily for **transparency** — we want our community to be able to see how the platform works. Unlike many open source projects, we don't maintain this codebase as a general-purpose tool for forking or customization. We build it with one deployment in mind: iNaturalist.org and the iNaturalist mobile apps.

We will probably close pull requests that don't address open issues. Again, if you want to change functionality, the discussion should start in the [Forum](https://forum.inaturalist.org/), and if staff agree something should change, we'll make an issue, label it, and then you can work on it.

We're a small team. Our capacity to review and integrate external contributions is limited, and we can't commit to responding to every inquiry or pull request.

## Bugs and feature requests

**Please don't open GitHub issues for user-facing bug reports or feature requests.**

We track our work internally and triage inbound requests through the [iNaturalist Forum](https://forum.inaturalist.org). Filing a GitHub issue is unlikely to result in action, and you're much more likely to get a response — and to hear from other community members with similar experiences — on the Forum.

- **Bug reports:** [forum.inaturalist.org](https://forum.inaturalist.org) → Bug Reports category, tag with `Seek` 
- **Feature requests:** [forum.inaturalist.org](https://forum.inaturalist.org) → Feature Requests category, tag with `Seek`

If you've found a problem in the code, please supply detailed reproduction conditions, cite line numbers, include exceptions / stack traces, etc. If you can't supply this kind of information, we will probably close your issue and suggest you post to the forum links above.

# Reporting Security Issues

You should report security issues that require confidential communication to [help+security@inaturalist.org](mailto:help+security@inaturalist.org). We do not offer any rewards or bounties for reporting security issues, though we may offer to list your name and URL here if we act on your report.

---

## Translations

Translations are handled separately through [Crowdin](https://crowdin.com/project/seek), not through pull requests. If you'd like to help translate Seek into another language, that's the place to start — and it's one of the most impactful ways to contribute to the project.

## Code

Seek is an open source React Native application, so if you're familiar with React Native you can help us out with development tasks. Here's how we'd like you to do that:

1. [Set up your dev environment](https://github.com/inaturalist/SeekReactNative#setup-files).
1. Find an [unassigned issue](https://github.com/inaturalist/SeekReactNative/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee) you want to work on. Bugs are the highest priority!
1. Leave a comment on the issue saying you want to work on it so we can assign it to you (and other people know someone's working on it).
1. Fork the repo.
1. Make an issue-specific branch in your repo starting with the issue number, so something like `1234-animation-timing` if the work concerns the timing of an animation. This helps us know what issue a pull request is supposed to fix.
1. Work on the issue in your branch.
1. Make a pull request. We'll try and review it within a week or two.

We can't guarantee that we'll merge all code, and how quickly we can review PRs depends on what other things we're working on. Thanks for your patience and understanding.

## Donations

iNaturalist is a non-profit providing free services with no ads. If you'd like to keep it that way, [please consider becoming a Monthly Supporter](https://www.inaturalist.org/monthly-supporters) at any amount. Seriously, every bit helps.