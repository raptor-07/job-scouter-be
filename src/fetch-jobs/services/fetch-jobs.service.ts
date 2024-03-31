import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FetchJobsService {
    async fetchJobs(keywords: string[]) {
        try {
            const mockKeywords = keywords.slice(0, 4);
            const search_terms = mockKeywords.join(' ');

            console.log(search_terms);

            const response = await axios.post(
                'https://linkedin-jobs-search.p.rapidapi.com/',
                {
                    search_terms,
                    location: '',
                    page: '1',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-RapidAPI-Key': `${process.env.LI_JOBS_SEARCH}`,
                    },
                },
            );

            console.log(response.data);

            if (!response.data || response.data.length === 0) {
                return [];
            }

            return response.data.map(job => ({
                company_name: job.normalized_company_name,
                company_url: job.linkedin_company_url_cleaned,
                linked_url: job.linkedin_job_url_cleaned,
                job_title: job.job_title,
                job_location: job.job_location,
            }));
        } catch (error) {
            // Handle the error here
            console.error('Error fetching jobs:', error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }
}