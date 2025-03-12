package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Model.BillingObject;
import com.cloudpulse.dev.Service.BigQueryBillingService;
import com.google.cloud.bigquery.TableResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/billing")
public class BigQueryBillingController {

    private final BigQueryBillingService bigQueryBillingService;

    public BigQueryBillingController(BigQueryBillingService bigQueryBillingService) throws Exception {
        this.bigQueryBillingService = bigQueryBillingService;
    }

    @GetMapping("/{projectId}")
    public Map<String, List<Map<String, String>>> getBilling(@PathVariable("projectId") String projectId) throws Exception{
        return bigQueryBillingService.queryBillingData(projectId);
    }

}
