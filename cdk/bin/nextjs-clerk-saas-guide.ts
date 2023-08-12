#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NextjsClerkSaaSGuideStack } from '../lib/nextjs-clerk-saas-guide-stack';

const app = new cdk.App();
new NextjsClerkSaaSGuideStack(app, 'NextjsClerkSaaSGuideStack', {});