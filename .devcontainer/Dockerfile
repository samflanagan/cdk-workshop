# Dockerfile
ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

RUN curl -L https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-arm64.zip -o aws-sam-cli.zip \
    && unzip aws-sam-cli.zip -d sam-installation \
    && ./sam-installation/install \
    && rm aws-sam-cli.zip