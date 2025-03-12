package com.cloudpulse.dev.Service;

import com.cloudpulse.dev.Model.BillingObject;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.bigquery.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class BigQueryBillingService {

    public Map<String, List<Map<String, String>>> queryBillingData(String projectId) throws Exception{

        //List<BillingObject> billingList = new ArrayList<>();

        Map<String, List<Map<String, String>>> billingList = new HashMap<>();

        String datasetId = "billing_details"; // Replace with your BigQuery dataset ID
        String tableId = "gcp_billing_export_v1_01B2CA_A288FA_08C271"; // Replace with your BigQuery table name

        Resource resource = new ClassPathResource("service-account-data-jsonfile.json");

            // Get InputStream from the resource
        InputStream inputStream = resource.getInputStream();

            // Authenticate using GoogleCredentials
        GoogleCredentials credentials = GoogleCredentials.fromStream(inputStream)
                    .createScoped(Collections.singletonList("https://www.googleapis.com/auth/cloud-platform"));

        BigQuery bigQuery = BigQueryOptions.newBuilder().setCredentials(credentials).setProjectId(projectId).build().getService();

        // SQL Query to fetch billing data
        String query = String.format(
                "SELECT \n" +
                        "    project.id AS project_id, \n" +
                        "    service.description AS service_description,\n" +
                        "    SUM(cost) AS total_cost,\n" +
                        "    ARRAY_AGG(DISTINCT invoice.month) AS invoice_month\n" +
                        "FROM \n" +
                        "    `%s.%s.%s`\n" +
                        "GROUP BY \n" +
                        "    project.id, service.description;" , projectId, datasetId, tableId
        );

        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(query)
                .setUseLegacySql(false)
                .build();

        try {
            // Run the query
            JobId jobId = JobId.of(UUID.randomUUID().toString());
            Job queryJob = bigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());
            queryJob = queryJob.waitFor();

            if (queryJob == null || queryJob.getStatus().getError() != null) {
                System.out.println("Query failed: " + queryJob.getStatus().getError());
                return null;
            }

            // Fetch results
            TableResult result = queryJob.getQueryResults();

            for (FieldValueList row : result.iterateAll()) {
                Map<String , String> eachService = new HashMap<>();

                String project_id = (String) row.get("project_id").getValue();
                String service_name = (String) row.get("service_description").getValue();
                String total_cost = (String) row.get("total_cost").getValue();
                FieldValueList invoiceMonthArray = (FieldValueList) row.get("invoice_month").getRepeatedValue();

                List<String> invoiceMonths = new ArrayList<>();
                for (FieldValue value : invoiceMonthArray) {
                    invoiceMonths.add(value.getStringValue());
                }

                String invoice_month = invoiceMonths.get(0);
                eachService.put("project_id",project_id);
                eachService.put("service_name", service_name);
                eachService.put("total_cost",total_cost);
                eachService.put("invoice_month",invoice_month);

                List<String> keysList = new ArrayList<>(billingList.keySet());
                if(keysList.contains(project_id)){
                    billingList.get(project_id).add(eachService);
                }else{
                    List<Map<String,String>> list = new ArrayList<>();
                    list.add(eachService);
                    billingList.put(project_id,list);
                }

                //System.out.println(project_id + " " + service_name + " " + total_cost + " " + invoice_month);

//                String projectID = (String) row.get("projectId").getValue();
//                String service = (String) row.get("service").getValue();
//                String skuId = (String) row.get("skuId").getValue();
//                String skuDescription = (String) row.get("skuDescription").getValue();
//                String usageAmount = (String) row.get("usage").getValue();
//                String cost = (String) row.get("cost").getValue();
//                String currency = (String) row.get("currency").getValue();
//                String billingMonth =(String) row.get("month").getValue();
//
//                BillingObject eachRow = new BillingObject(projectID,service,skuId,skuDescription,usageAmount,cost,currency,billingMonth);
//                billingList.add(new BillingObject("","","","","","","","");

            }

            return billingList;

        } catch (Exception e) {
            System.err.println("Query failed: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
}