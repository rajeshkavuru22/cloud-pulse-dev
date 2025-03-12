package com.cloudpulse.dev.Controller;

import com.cloudpulse.dev.Service.AssetsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SuppressWarnings("unchecked")
@RestController
@RequestMapping("projects/{project_id}")
public class AllAssetsController {
        static AssetsService assetsService;

        public AllAssetsController(AssetsService assetsService){ AllAssetsController.assetsService = assetsService;}

        @GetMapping("/all-assets")
        public List<Object> allAssets(@PathVariable("project_id") String projectId) throws Exception{
            return assetsService.getAllAssetsList(projectId);
        }
}
